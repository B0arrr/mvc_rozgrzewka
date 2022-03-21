$('span.fa.unchecked').on('click', function () {
    $(this).toggleClass('unchecked checked')
    const id = $(this).parent('.searches').find('a').attr('href').split('=')[1]
    if ($(this).hasClass('checked')) {
        $.ajax('/addToFavorites', {
            type: 'POST',
            data: {id: id}
        })
    } else {
        $.ajax('/removeFromFavorites', {
            type: 'POST',
            data: {id: id}
        })
    }
})

$(document).ready(function () {
    $.ajax('/getFavorites', {
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (i) {
                console.log(data[i])
                $('div.searches').each(function () {
                    if($(this).find('a').attr('href').split('=')[1] === data[i]) {
                        $(this).find('span').toggleClass('unchecked checked')
                    }
                })
            })
        }
    })
})