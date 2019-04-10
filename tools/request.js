var baseUrl = "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine"

function request(param) {
    wx.request({
        url: baseUrl + param.url,
        success: function(res) {
            if (res.data.code == 0) {
                param.success(res.data.data);
            } else {
                showError();
            }
        },
        fail: function() {
            showError();
        }
    })
};

function showError() {
    wx.showToast({
        title: '请求错误',
        icon: 'none'
    })
};

module.exports = request;