import Cycle from '@cycle/core';
import {main, drivers} from './app';

/* styles */
require('index.css');

/* load app */
Cycle.run(main, drivers());

