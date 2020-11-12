const checkVolume = () => {
    $('.volume-slider').val($('.volume-slider').val());
    $('#stream')[0].volume = $('.volume-slider').val();
};

$('.volume-slider')
.on('click', checkVolume)
.on('mousemove', checkVolume)
.on('mousedown', checkVolume)
.on('mouseup', checkVolume);
window.onload = () => { 
    $.getJSON("../package.json", data => {
        $("#ver").html(`v${data.version}`);
    })
    let count = 0;
    setInterval(() => {
        const cd = $("#cd");
        const delay = $("#del");
        const stream = $('#stream')[0];
        if(stream.paused) {
            count++
            delay.html(count);
            cd.fadeIn("slow");
        }
    }, 1000)
}

const togglePlay = () => {
    const stream = $('#stream');
    const button = $('.play-button');
    if (stream[0].paused) {
        button.removeClass('fa-play');
        button.removeClass('fa-pause');
        button.addClass('fa-spinner-third');
        stream.attr('src', 'https://stream.livida.net/');
        checkVolume();
        stream[0].play()
        .then(() => {
            button.removeClass('fa-play');
            button.removeClass('fa-spinner-third');
            button.addClass('fa-pause');
        })
        .catch(() => {
            button.removeClass('fa-pause');
            button.removeClass('fa-spinner-third');
            button.addClass('fa-play');
        });
    } else {
        stream[0].pause();
        button.removeClass('fa-pause');
        button.removeClass('fa-spinner-third');
        button.addClass('fa-play');
    };
};


const updateStats = () => {
    $.get('https://livida.net/api/radio/', (res) => {
        const data = res;
        $('.song-art').attr('src', data.nowplaying.album.art || `./assets/img/Livida.png`);
        $('.artist-image').attr('src', data.nowplaying.artist.art || `./assets/img/Livida.png`);
        $('.song-title').text(data.nowplaying.song.name);
        $('.song-artist').text(data.nowplaying.artist.name);
        $('.dj-name').text(data.dj.username);
        const songText = `${data.nowplaying.song.name} by ${data.nowplaying.artist.name}`;
        if (window.prevSongText != songText) {
            $('.song-text').text(songText);
            if ($('.song-text').parent().prop('scrollHeight') > $('.song-text').parent().height() + 16) {
                const t = $('<div></div>').html(songText).text(),
                      m = `<marquee direction="right" scrollamount="5">${t}</marquee>`;
                $('.song-text').html(m);
            };
        };
        window.prevSongText = songText;
    })
    .fail((err) => {
        console.error(`Error whilst fetching song metadata:`, err);
        $('.song-art').attr('src', `./assets/img/Livida.png`);
        $('.artist-image').attr('src', `./assets/img/Livida.png`);
        $('.song-title').text('Stream Offline');
        $('.song-artist').text('Unknown');
        $('.dj-name').text('Stream Offline');
        $('.listeners').text('Unknown');
    });
};

updateStats();
setInterval(updateStats, 5000);
togglePlay();

$('.play-button').click(togglePlay);
