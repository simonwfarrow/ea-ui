export default class ADR {
  title: string;
  state: string;
  createdAtUTC: Date;
  closedAtUTC: Date;
  isOpen: boolean;
  isClosed: boolean;
  ttrInDays: number = 0;
  milestone: string;
  isIdentified:boolean;
  isProposed:boolean;
  isAccepted: boolean;
  isBeingProved: boolean;
  isAdopted: boolean;
  isRejected: boolean;

  constructor(dto:any) {
    this.title = dto.title;
    this.state = dto.state;
    this.createdAtUTC = new Date(dto.created_at);
    this.closedAtUTC = new Date(dto.closed_at);
    this.isOpen = this.state === 'open';
    this.isClosed = this.state === 'closed';
    this.ttrInDays = this.calculateTimeToResolutionInDays();
    this.milestone = dto.milestone ? dto.milestone.title : '';
    this.isIdentified = this.milestone === 'Identified';
    this.isProposed = this.milestone === 'Proposed';
    this.isAccepted = this.milestone === 'Accepted';
    this.isBeingProved = this.milestone === 'Prove';
    this.isAdopted = this.milestone === 'Adopted';
    this.isRejected = this.milestone === 'Rejected';
  }

  calculateTimeToResolutionInDays(): number {
    if (this.isOpen) {
      return 0;
    }
    const oneDayInMilliseconds = 24 * 3600 * 1000;
    return (this.closedAtUTC.getTime() - this.createdAtUTC.getTime()) / oneDayInMilliseconds;
  }
}
