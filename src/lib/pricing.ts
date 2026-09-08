export type PricingInputs={base:number;distance:number;vehicleRate:number;airportFee:number;waiting:number;tolls:number;afterHours:number;special:number};
export const calculateQuote=(i:PricingInputs)=>Object.values(i).reduce((a,b)=>a+b,0);
