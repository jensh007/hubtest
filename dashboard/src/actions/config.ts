import { ThunkAction } from "redux-thunk";
import { ActionType, createAction } from "typesafe-actions";
import { IStoreState, IURLParams } from "../shared/types";

import Config, { IConfig } from "../shared/Config";

export const requestConfig = createAction("REQUEST_CONFIG");
export const receiveConfig = createAction("RECEIVE_CONFIG", resolve => {
  return (config: IConfig) => resolve(config);
});
export const errorConfig = createAction("ERROR_CONFIG", resolve => {
  return (err: Error) => resolve(err);
});
export const setURLParams = createAction("SET_URL_PARAMS", resolve => {
    return (params: IURLParams) => resolve(params)
});

const allActions = [requestConfig, receiveConfig, errorConfig, setURLParams];
export type ConfigAction = ActionType<typeof allActions[number]>;

export function getConfig(): ThunkAction<Promise<void>, IStoreState, null, ConfigAction> {
  return async dispatch => {
    dispatch(requestConfig());
    try {
      const config = await Config.getConfig();
      dispatch(receiveConfig(config));
    } catch (e) {
      dispatch(errorConfig(e));
    }
  };
}
