 $.ajax({
            url: '/login_ajax/',
            type: 'post',
            data: {
               picStream:re.target.result
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    window.location = data.url
                }
                else {
                    alert('传输失败')
                }
            }
        })