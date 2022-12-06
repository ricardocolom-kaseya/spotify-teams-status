let songs = [
    {
        "name": "Headstrong",
        "album_name": "Trapt",
        "artists": [
            "Trapt"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b27374d9a833744be96426ee833c",
        "id": "1AEYT6VxrxXPMoQUxsY0E4"
    },
    {
        "name": "Loco-Motive",
        "album_name": "Life is Good",
        "artists": [
            "Nas",
            "Large Professor"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273bfca10ab09c44462f1cc56ac",
        "id": "5XLsxDGnb26aMmuC3BPWxu"
    },
    {
        "name": "Accident Murderers",
        "album_name": "Life Is Good (Explicit Version)",
        "artists": [
            "Nas",
            "Rick Ross"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273bfca10ab09c44462f1cc56ac",
        "id": "1Z6hAwj1hWuwxal48zSDyY"
    },
    {
        "name": "So Cold - Remix",
        "album_name": "We Are Not Alone",
        "artists": [
            "Breaking Benjamin"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b2734500b37eb7046f29233099a0",
        "id": "4BJyt25nburVwbnESDeIc7"
    },
    {
        "name": "What I've Done",
        "album_name": "Minutes to Midnight",
        "artists": [
            "Linkin Park"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b27346e207de66ba06422897f769",
        "id": "18lR4BzEs7e3qzc0KVkTpU"
    },
    {
        "name": "The Reason",
        "album_name": "The Reason (15th Anniversary Deluxe)",
        "artists": [
            "Hoobastank"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b27376cc6eedca8eb381afcd1e46",
        "id": "77loZpT5Y5PRP1S451P9Yz"
    },
    {
        "name": "Dead Presidents II",
        "album_name": "Reasonable Doubt",
        "artists": [
            "JAY-Z"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273c467c0b670b01b117ce939f9",
        "id": "5Kqr27us3rTeuchp9Z6Inf"
    },
    {
        "name": "The Ghost of You",
        "album_name": "Three Cheers for Sweet Revenge",
        "artists": [
            "My Chemical Romance"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273cab7ae4868e9f9ce6bdfdf43",
        "id": "1yKAqZoi8xWGLCf5vajroL"
    },
    {
        "name": "I Will Not Bow",
        "album_name": "Dear Agony",
        "artists": [
            "Breaking Benjamin"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b27308cdafd988bd04d9b14159d3",
        "id": "2yXyz4NLTZx9CLdXfLTp5E"
    }
]

export function pickRandomSong() {
    return songs[Math.floor(Math.random() * songs.length)]
}
