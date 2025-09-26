import type { PoolInfo } from '@chik-network/api';
import { toCamelCase } from '@chik-network/api';

export default async function getPoolInfo(poolUrl: string): Promise<PoolInfo> {
  const data = await window.appAPI.fetchPoolInfo(poolUrl);
  return toCamelCase(data) as PoolInfo;
}
