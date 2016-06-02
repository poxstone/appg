import os
import sys

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'lib'))
sys.path.insert(1, os.path.join(os.path.abspath('.'), 'application'))
import application

import endpoints
from apis import GreetingApi, AuthedGreetingApi
api = endpoints.api_server([GreetingApi, AuthedGreetingApi])
