import API from './API';

enum ChikLogsAPI {
  GET_CONTENT = `${API.CHIK_LOGS}:getContent`,
  GET_INFO = `${API.CHIK_LOGS}:getInfo`,
  SET_PATH = `${API.CHIK_LOGS}:setPath`,
}

export default ChikLogsAPI;
