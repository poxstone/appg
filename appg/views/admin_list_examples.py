# -*- coding: utf-8 -*-

from flask.views import View

from flask import flash, redirect, url_for, jsonify, render_template, request
import json
from google.appengine.api import users
from google.appengine.runtime.apiproxy_errors import CapabilityDisabledError

from forms import ExampleForm
from models import ExampleModel

from decorators import login_required
from utils import to_dict


class PIni(View):
    @login_required
    def dispatch_request(self):
        examples = ExampleModel.query()

        return render_template('ini.html', examples=examples )

class PIni_list(View):

    #@login_required
    def dispatch_request(self):
        list = ExampleModel.query().fetch()
        list = to_dict(list)

        return jsonify(results = list)

class PIni_delete(View):
    @login_required
    def dispatch_request(self):
        if request.method == "POST":

            form = request.get_json()
            example_id = form['example_id']

            if example_id:
                example = ExampleModel.get_by_id( int(example_id) )

                if example:
                    try:
                        example.key.delete()
                        return jsonify(result = {'status':'ok'})

                    except CapabilityDisabledError:
                        return jsonify(result = {'status':'Error to save'})

                else:
                    return jsonify(result = {'status':'NOT item found'})

            else:
                return jsonify(result = {'status':'no example_example send'})

        else:
            return jsonify(result = {'status':'NOT is correct method'})

class PIni_put(View):
    @login_required
    def dispatch_request(self):

        if request.method == "POST":
            form = request.get_json()
            example = ExampleModel(
                example_name = form['example_name'],
                example_description = form['example_description'],
                added_by = users.get_current_user()
            )

            try:
                example.put()
                example_id = example.key.id()
                return jsonify(result = {'status':'ok'})

            except CapabilityDisabledError:
                return jsonify(result = {'status':'DONT cant save'})

        else:
            return jsonify(result = {'status':'NOT is correct method'})

class PIni_update(View):
    @login_required
    def dispatch_request(self):
        if request.method == "POST":

            form = request.get_json()
            example_id = form['example_id']

            if example_id:
                example = ExampleModel.get_by_id( int(example_id) )

                if example:
                    try:
                        example.example_name = form['example_name']
                        example.example_description = form['example_description']

                        example.put()
                        return jsonify(result = {'status':'ok'})

                    except CapabilityDisabledError:
                        return jsonify(result = {'status':'Error to update'})

                else:
                    return jsonify(result = {'status':'NOT item found'})

            else:
                return jsonify(result = {'status':'no example_example send'})

        else:
            return jsonify(result = {'status':'NOT is correct method'})
