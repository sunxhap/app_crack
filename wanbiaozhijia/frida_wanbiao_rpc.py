# -*- coding: utf-8 -*-

import time
import frida
import codecs

session = frida.get_remote_device().attach("com.xbiao")

time.sleep(1)

with codecs.open("frida_wanbiao_rpc.js", 'r', encoding="utf-8") as f:
    script = session.create_script(f.read())


def my_message_handler(message, payload):
    print(message)
    print(payload)


script.on("message", my_message_handler)
script.load()

print(script.exports.callfun())
