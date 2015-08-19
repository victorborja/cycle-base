/** @jsx hJSX */
import {makeDOMDriver, hJSX} from '@cycle/dom';

function view({counter$}) {
  const view$ = counter$.map(value => 
    <div>
      <button id="dec">-</button>
      <code>{value}</code>
      <button id="inc">+</button>
    </div>);
  return {view$};
}

function model({increment$, decrement$}) {
  const counter$ = increment$.merge(decrement$).
    startWith(0).scan((a,b) => a + b);
  return {counter$};
}

function intent(dom) {
  const increment$ = dom.get('#inc', 'click')
      .map(ev => 1);

  const decrement$ = dom.get('#dec', 'click')
      .map(ev => -1);

  return {increment$, decrement$};
}

function main({DOM}) {
  const {view$} = view(model(intent(DOM)));
  return {DOM: view$};
}

function drivers() {
  return {DOM: makeDOMDriver('#app')};
};

export {main, drivers};
