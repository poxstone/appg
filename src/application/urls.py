"""
urls.py

URL dispatch route mappings and error handlers

"""
from flask import render_template

from application import app

from application.views.public.public_warmup import PublicWarmup
from application.views.public.public_index import PublicIndex
from application.views.public.public_say_hello import PublicSayHello

from application.views.admin.admin_list_examples import AdminListExamples, PIni,\
    PIni_list, PIni_delete, PIni_put, PIni_update, PIni2
from application.views.admin.admin_list_examples_cached import AdminListExamplesCached
from application.views.admin.admin_secret import AdminSecret
from application.views.admin.admin_edit_example import AdminEditExample
from application.views.admin.admin_delete_example import AdminDeleteExample


# URL dispatch rules

# App Engine warm up handler
# See http://code.google.com/appengine/docs/python/config/appconfig.html#Warming_Requests
app.add_url_rule('/_ah/warmup', 'public_warmup', view_func=PublicWarmup.as_view('public_warmup'))

app.add_url_rule('/', 'public_index', view_func=PublicIndex.as_view('public_index'))
app.add_url_rule('/hello/<username>', 'public_say_hello', view_func=PublicSayHello.as_view('public_say_hello'))
app.add_url_rule('/examples', 'list_examples', view_func=AdminListExamples.as_view('list_examples'), methods=['GET', 'POST'])
app.add_url_rule('/examples/cached', 'cached_examples', view_func=AdminListExamplesCached.as_view('cached_examples'))
app.add_url_rule('/admin_only', 'admin_only', view_func=AdminSecret.as_view('admin_only'))
app.add_url_rule('/examples/<int:example_id>/edit', 'edit_example', view_func=AdminEditExample.as_view('edit_example'), methods=['GET', 'POST'])
app.add_url_rule('/examples/<int:example_id>/delete', 'delete_example', view_func=AdminDeleteExample.as_view('delete_example'), methods=['POST'])

app.add_url_rule('/ini', 'ini', view_func=PIni.as_view('ini'), methods=['GET', 'POST'])
app.add_url_rule('/ini2', 'ini2', view_func=PIni2.as_view('ini2'), methods=['GET', 'POST'])
app.add_url_rule('/ini_list', 'ini_list', view_func=PIni_list.as_view(''), methods=['GET', 'POST'])
app.add_url_rule('/ini_delete', 'ini_delete', view_func=PIni_delete.as_view(''), methods=['POST','DELETE'])
app.add_url_rule('/ini_put', 'ini_put', view_func=PIni_put.as_view(''), methods=['PUT', 'POST'])
app.add_url_rule('/ini_update', 'ini_update', view_func=PIni_update.as_view(''), methods=['POST','PUT'])
# Error handlers

# Handle 404 errors


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Handle 500 errors


@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500
