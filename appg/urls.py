"""
urls.py

URL dispatch route mappings and error handlers

"""
from flask import render_template, redirect

from appg import app
from appg.views.admin_list_examples import PIni,\
    PIni_list, PIni_delete, PIni_put, PIni_update


# URL dispatch rules
app.add_url_rule('/ini/', 'ini', view_func=PIni.as_view('ini'), methods=['GET', 'POST'])
app.add_url_rule('/ini/list', 'ini_list', view_func=PIni_list.as_view(''), methods=['GET', 'POST'])
app.add_url_rule('/ini/delete', 'ini_delete', view_func=PIni_delete.as_view(''), methods=['POST','DELETE'])
app.add_url_rule('/ini/put', 'ini_put', view_func=PIni_put.as_view(''), methods=['PUT', 'POST'])
app.add_url_rule('/ini/update', 'ini_update', view_func=PIni_update.as_view(''), methods=['POST','PUT'])


# Error handlers

# Handle 404 errors
@app.errorhandler(404)
def page_not_found(e):
    return redirect('../static/html/404.html')

# Handle 500 errors
@app.errorhandler(500)
def server_error(e):
    return redirect('../static/html/500.html')
