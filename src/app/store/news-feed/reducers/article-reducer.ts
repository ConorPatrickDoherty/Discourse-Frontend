import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/interfaces/article';
import { articleAction } from '../actions/article-action';
import { State } from '../interfaces/state';

const initialState:Article = {
    source: {
        id: '',
        name: ''
    },
    author: '',
    title: '',
    description: '',
    publishedAt: '',
    url: '',
    urlToImage: '',
    content: ''
}

export const articleReducer = createReducer(
    initialState,
    on(articleAction, (state: Article, action) => ({
        ...state,
        ...action.payload
    }))
)