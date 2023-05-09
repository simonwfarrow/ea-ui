import type ADR from '../mi/adr';
import type { ServiceDescriptor  } from "@electronic-architect/ea-services/src/@types/sdTypes";
import type { FlowDescriptor  } from "@electronic-architect/ea-flows/src/@types/fdTypes";

enum QueryResultType {
  ServiceDescriptor,
  FlowDescriptor
}

export default class QueryResult {
  type:QueryResultType;
  storeKey:string;
  item: ServiceDescriptor | FlowDescriptor;
  isServiceDescriptor: boolean;
  isFlowDescriptor: boolean;

  static fromServiceDescriptor(storeKey:string, serviceDescriptor:ServiceDescriptor):QueryResult {
    return new QueryResult(QueryResultType.ServiceDescriptor, storeKey, serviceDescriptor);
  }

  static fromFlowDescriptor(storeKey:string, flowDescriptor:FlowDescriptor):QueryResult {
    return new QueryResult(QueryResultType.FlowDescriptor, storeKey, flowDescriptor);
  }

  constructor(type:QueryResultType, storeKey:string, item: ServiceDescriptor | FlowDescriptor) {
    this.type = type;
    this.storeKey = storeKey;
    this.item = item;
    this.isServiceDescriptor = (type === QueryResultType.ServiceDescriptor);
    this.isFlowDescriptor = !this.isServiceDescriptor;
  }
}
