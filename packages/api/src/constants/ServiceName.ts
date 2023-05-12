const ServiceName = {
  WALLET: 'chia_wallet',
  FULL_NODE: 'chia_full_node',
  FARMER: 'chik_farmer',
  HARVESTER: 'chik_harvester',
  SIMULATOR: 'chik_full_node_simulator',
  DAEMON: 'daemon',
  PLOTTER: 'chik_plotter',
  TIMELORD: 'chik_timelord',
  INTRODUCER: 'chik_introducer',
  EVENTS: 'wallet_ui',
  DATALAYER: 'chik_data_layer',
  DATALAYER_SERVER: 'chik_data_layer_http',
} as const;

type ObjectValues<T> = T[keyof T];

export type ServiceNameValue = ObjectValues<typeof ServiceName>;

export default ServiceName;
