import React from 'react'
import Loadable from 'react-loadable';

const A = Loadable({
    loader: () => import('../pages/A/A'),
    loading:()=> <div>loading...</div>
});
const B = Loadable({
    loader: () => import('../pages/B/B'),
    loading:()=> <div>loading...</div>
});


export {
    A,B
}