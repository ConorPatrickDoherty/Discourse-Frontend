import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/interfaces/article';

export const articleAction = createAction(
    'ViewArticle',
    props<{payload:Article}>()
)