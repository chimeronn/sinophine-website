import requests
from song_model import app, db, Song
from flask import Flask, redirect, request, session, jsonify
import base64
import os
from datetime import datetime

app.secret_key = os.urandom(24)

CLIENT_ID = "5a47a5f7e3b54f92b21565c221aada18"
CLIENT_SECRET = "3d5aaa4a81cb4e4e9bdc07ad44306953"
REDIRECT_URI = "http://127.0.0.1:8080/callback"
SCOPE = "user-read-private user-read-email"

AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"

@app.route('/')
def login():
    return redirect(
        f"{AUTH_URL}?response_type=code&client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}&scope={SCOPE}"
    )

@app.route('/callback')
def callback():
    code = request.args.get('code')

    auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth_str}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    response = requests.post(TOKEN_URL, data=data, headers=headers)
    token_info = response.json()

    # session['access_token'] = token_info['access_token']
    # print("ACCESS TOKEN SAVED:", session['access_token'])

    access_token = token_info['access_token']
    if not access_token:
        print("An error has occurred")
        return {"error": "Not authenticated"}, 401
    
    artist_id = '556ZEmSprqfAikh9AXh95F'
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        "market": "US"
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()

    if "tracks" not in data:
        return {"error": "No tracks found"}, 404
    track_info_list = []

    rank = 1
    for track in data["tracks"]:
        album = track.get("album", {})
        id = track.get("id")
        popularity_rank = rank
        name = track.get("name")
        release_date_str = album.get("release_date", "Unknown")
        release_date = datetime.strptime(release_date_str, "%Y-%m-%d").date()
        image_url = album.get("images", [{}])[0].get("url")
        # track_info = {
        #     "id": track.get("id"),
        #     "popularity_rank": rank,
        #     "name": track.get("name"),
        #     "release_date": album.get("release_date", "Unknown"),
        #     "image_url": album.get("images", [{}])[0].get("url")
        # }
        # track_info_list.append(track_info)

        existing_song = Song.query.filter_by(id = id).first()
        if not existing_song:
            new_song = Song(
                id = id,
                popularity_rank = popularity_rank,
                title = name,
                date = release_date,
                image_url = image_url,
            )
            db.session.add(new_song)
        else:
            if existing_song.popularity_rank != popularity_rank:
                existing_song.popularity_rank = popularity_rank
        rank += 1
    db.session.commit()
    return redirect("http://localhost:5173/loggedin")

@app.route('/profile')
def profile():
    access_token = session.get('access_token')
    if not access_token:
        return redirect('/')

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    profile_resp = requests.get("https://api.spotify.com/v1/me", headers=headers)
    return jsonify(profile_resp.json())

def get_app_token():
    auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth_str}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "client_credentials"
    }

    response = requests.post(TOKEN_URL, headers=headers, data=data)
    token_info = response.json()
    return token_info["access_token"]

@app.route('/get_tracks')
def get_tracks():
    access_token = get_app_token()

    artist_id = '556ZEmSprqfAikh9AXh95F'
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        "market": "US"
    }
    
    search = request.args.get("search", "", type=str).strip()
    query = Song.query
    if search:
        query = query.filter(Song.title.ilike(f"%{search}%"))
    results = query.all()
    return jsonify([
        {
            "title": song.title,
            "release_date": song.date.strftime("%Y-%m-%d") if song.date else "Unknown",
            "image_url": song.image_url,
        }
        for song in results
    ])

if __name__ == '__main__':
    app.run(debug=True, port=8080)