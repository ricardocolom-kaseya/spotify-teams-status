let songs = [
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
    },
    {
        "name": "Be Quiet and Drive (Far Away)",
        "album_name": "Around the Fur",
        "artists": [
            "Deftones"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b2730b1129853982ea17845d4eb6",
        "id": "4Uiw0Sl9yskBaC6P4DcdVD"
    },
    {
        "name": "Entombed",
        "album_name": "Koi No Yokan",
        "artists": [
            "Deftones"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b27373652b7a0dc388dd1d044b69",
        "id": "4bLCPfBLKlqiONo6TALTh5"
    },
    {
        "name": "Change (In the House of Flies)",
        "album_name": "White Pony",
        "artists": [
            "Deftones"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b2735c53799f473fa3e1a48c00ed",
        "id": "51c94ac31swyDQj9B3Lzs3"
    },
    {
        "name": "Empire State Of Mind",
        "album_name": "The Blueprint 3",
        "artists": [
            "JAY-Z",
            "Alicia Keys"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273fec1b815bb3c50a64a90fd10",
        "id": "2igwFfvr1OAGX9SKDCPBwO"
    },
    {
        "name": "Attack",
        "album_name": "A Beautiful Lie",
        "artists": [
            "Thirty Seconds To Mars"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273865b538169f199dac610b854",
        "id": "0lHSJ0ZP8uUPnJXhMdGjOK"
    },
    {
        "name": "Today",
        "album_name": "(Rotten Apples) The Smashing Pumpkins Greatest Hits",
        "artists": [
            "The Smashing Pumpkins"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b273c48f42fdafcffcedbdbce025",
        "id": "1XPta4VLT78HQnVFd1hlsK"
    },
    {
        "name": "Kill Bill",
        "album_name": "SOS",
        "artists": [
            "SZA"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
        "id": "3OHfY25tqY28d16oZczHc8"
    },
    {
        "name": "ALMOST READY",
        "album_name": "LIFE IN HELL",
        "artists": [
            "Lancey Foux"
        ],
        "img": "https://i.scdn.co/image/ab67616d0000b2735e156af0dc2f178d7371da81",
        "id": "2Jl9fe9i1HNUD8TIECdg2G"
    }
]

export function pickRandomSong() {
    return songs[Math.floor(Math.random() * songs.length)]
}
