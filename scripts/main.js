
$(function() {
    $('#mc-embedded-subscribe-form').submit(function(event) {
        event.preventDefault();
        $('#subscribe').prop('disabled', true);
        $.ajax({
            type: $('#mc-embedded-subscribe-form').attr('method'),
            url: $('#mc-embedded-subscribe-form').attr('action'),
            data: $('#mc-embedded-subscribe-form').serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: (response) => {
                console.log('Error', response);
                alert('حدث خطا ما. حاول مرّةً أخرى رجاءً.');
                $('#subscribe').prop('disabled', false);
            },
            success: (response) => {
                console.log('Success', response);
                if (response.result == 'error') {
                    var errormsg = '';
                    if (response.msg.includes('Please enter a value')) {
                        errormsg = 'أدخل بريدًا إلكترونيًا صحيحًا رجاءً.';
                    }
                    else if (response.msg.includes('cannot be imported')) {
                        errormsg = 'البريد الإلكتروني الذي أدخلته لا يبدو صالحًا.';
                    }
                    else if (response.msg.includes('domain portion')) {
                        errormsg = 'نطاق البريد الإلكتروني فارغ (الذي بعد @).';
                    }
                    else if (response.msg.includes('username portion')) {
                        errormsg = 'معرّف البريد الإلكتروني فارغ (الذي قبل @).';
                    }
                    else if (response.msg.includes('already subscribed')) {
                        errormsg = 'يبدو أنّك اشتركت مُسبقًا. يسعدنا ذلك.';
                    }
                    else {
                        errormsg = 'حدث خطا ما. حاول مرّةً أخرى رجاءً.';
                    }
                    alert(errormsg);
                } else {
                    alert('شكرًا لك على اهتمامك! وسنتواصل معك قريبًا!');
                }
                $('#subscribe').prop('disabled', false);
            }
        });
    });
});