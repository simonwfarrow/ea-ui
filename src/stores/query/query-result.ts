import type { FlowDescriptor } from '@electronic-architect/ea-flows/src/@types/fdTypes';
import type { ServiceDescriptor } from '@electronic-architect/ea-services/src/@types/sdTypes';
import type QueryTermMatch from './query-term-match';

enum QueryResultType {
  ServiceDescriptor,
  FlowDescriptor
}

export default class QueryResult {
  type: QueryResultType;
  storeKey: string;
  item: ServiceDescriptor | FlowDescriptor;
  isServiceDescriptor: boolean;
  isFlowDescriptor: boolean;
  matches: QueryTermMatch[];

  static fromServiceDescriptor(storeKey: string, serviceDescriptor: ServiceDescriptor, matches: QueryTermMatch[]): QueryResult {
    return new QueryResult(QueryResultType.ServiceDescriptor, storeKey, serviceDescriptor, matches);
  }

  static fromFlowDescriptor(storeKey: string, flowDescriptor: FlowDescriptor, matches: QueryTermMatch[]): QueryResult {
    return new QueryResult(QueryResultType.FlowDescriptor, storeKey, flowDescriptor, matches);
  }

  constructor(type: QueryResultType, storeKey: string, item: ServiceDescriptor | FlowDescriptor, matches: QueryTermMatch[]) {
    this.type = type;
    this.storeKey = storeKey;
    this.item = item;
    this.matches = matches;

    this.isServiceDescriptor = (type === QueryResultType.ServiceDescriptor);
    this.isFlowDescriptor = !this.isServiceDescriptor;
  }
}
