function notify(msg) {
    window.notify({
        group: 'foo',
        title: 'Important message',
        text: msg
    });
}

export default {
    notify
}
