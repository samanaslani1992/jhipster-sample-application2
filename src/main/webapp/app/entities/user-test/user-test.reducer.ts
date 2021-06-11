import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserTest, defaultValue } from 'app/shared/model/user-test.model';

export const ACTION_TYPES = {
  FETCH_USERTEST_LIST: 'userTest/FETCH_USERTEST_LIST',
  FETCH_USERTEST: 'userTest/FETCH_USERTEST',
  CREATE_USERTEST: 'userTest/CREATE_USERTEST',
  UPDATE_USERTEST: 'userTest/UPDATE_USERTEST',
  PARTIAL_UPDATE_USERTEST: 'userTest/PARTIAL_UPDATE_USERTEST',
  DELETE_USERTEST: 'userTest/DELETE_USERTEST',
  RESET: 'userTest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserTest>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserTestState = Readonly<typeof initialState>;

// Reducer

export default (state: UserTestState = initialState, action): UserTestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERTEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERTEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERTEST):
    case REQUEST(ACTION_TYPES.UPDATE_USERTEST):
    case REQUEST(ACTION_TYPES.DELETE_USERTEST):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_USERTEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERTEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERTEST):
    case FAILURE(ACTION_TYPES.CREATE_USERTEST):
    case FAILURE(ACTION_TYPES.UPDATE_USERTEST):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_USERTEST):
    case FAILURE(ACTION_TYPES.DELETE_USERTEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERTEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERTEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERTEST):
    case SUCCESS(ACTION_TYPES.UPDATE_USERTEST):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_USERTEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERTEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-tests';

// Actions

export const getEntities: ICrudGetAllAction<IUserTest> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERTEST_LIST,
  payload: axios.get<IUserTest>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserTest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERTEST,
    payload: axios.get<IUserTest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserTest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERTEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserTest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERTEST,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IUserTest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_USERTEST,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserTest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERTEST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
