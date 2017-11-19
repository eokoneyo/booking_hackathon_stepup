'use strict';

import rill from 'rill';
import bodyParser from '@rill/body';
import progress from '@rill/progress';
import setDom from 'set-dom';
import routeTransformer from 'libs/client/routeTransformer';

const dust = require('dustjs-helpers');
const Renderer = require('libs/renderer');

let app = rill();

//This guy does the magic of making sure express and rill routes play nice
app = routeTransformer(app);

//Initialize middlewares
app.use(progress({ speed: 500, easing: 'ease' }));
app.use(bodyParser());


//register only the frontend routes on the client
require('routes/frontend')(app, new Renderer(dust,setDom));

app.listen({});

export default app;