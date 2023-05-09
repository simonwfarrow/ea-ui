import type ADR from '../mi/adr';
import type { ServiceDescriptor  } from "@electronic-architect/ea-services/src/@types/sdTypes";
import type { FlowDescriptor  } from "@electronic-architect/ea-flows/src/@types/fdTypes";

export default class QueryResult {
  type:string;
  item: ServiceDescriptor | FlowDescriptor;
  isServiceDescriptor: boolean;
  isFlowDescriptor: boolean;

  static fromServiceDescriptor(serviceDescriptor:ServiceDescriptor):QueryResult {
    return new QueryResult('service-descriptor', serviceDescriptor);
  }

  static fromFlowDescriptor(flowDescriptor:FlowDescriptor):QueryResult {
    return new QueryResult('flow-descriptor', flowDescriptor);
  }

  constructor(type:string, item: ServiceDescriptor | FlowDescriptor) {
    this.type = type;
    this.item = item;
    this.isServiceDescriptor = (type === 'service-descriptor');
    this.isFlowDescriptor = !this.isServiceDescriptor;
  }
}
