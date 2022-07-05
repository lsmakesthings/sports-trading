import { WARN } from './utils.js';
import { assign, createMachine, interpret } from 'xstate';

const sanitiseResult = (result) => {
    if(result === undefined || result === null)
        return { raw: undefined, win: [], place: []};
        
    if(Array.isArray(result))
        return { win: result, place: [] };

    if(typeof result === 'string')
        return { win: [result], place: [] };

    if(typeof result === 'object' && Array.isArray(result.win) && Array.isArray(result.place))
        return result;

};

export const marketMachine = createMachine({
    id: 'market',
    initial: 'inactive',
    context: {
        options: [],
        conditions: {
            winners: 1,
            place: {
                num: 0,
                term: 1
            },
            other : {}
        },
        settle: undefined,
        result: {
            raw: undefined, 
            win: [],
            place: []
        }
    },
    states: {
        inactive: {
            always: [
                { target: 'open', cond: 'isInitialised' }
            ],
            on: { 
                INIT: { target: 'inactive', actions: 'initialise' },
                OPEN: { target: 'open', cond: 'isInitialised' }
            }
        },
        open: {
            on: {
                SUSPEND: 'suspended',
                SETTLE: { target: 'settled', cond: 'validResult', actions: 'assignResult' }
            }
        },
        suspended: {
            on: {
                UNSUSPEND: 'open'
            }
        },
        settled: {
            type: 'final'
        }
    }
},
{
    actions: {
        // TODO: Validate and Process Inputs
        initialise: assign({
            options: (context, event) => event.options ?? context.options,
            conditions: (context, event) => {
                const conditions = context.conditions;

                if(event.conditions === undefined)
                    return conditions;

                conditions.winners = event.conditions.winners ?? conditions.winners;
                conditions.place = event.conditions.place ?? conditions.place;

                for (const key in event.conditions) {
                    if (key === 'winners' || key === 'place')
                        continue;
                    
                    conditions.other[key] = event.conditions[key];
                }

                return conditions;
            },
            settle: (context, event) => event.settle ?? context.settle,
        }),
        assignResult: assign({
            result: (context, event) => {
                let result = context.settle(event.result, context.conditions);                
                return sanitiseResult(result);
            }
        })
    },
    guards: {
        isInitialised: (context) => {
            // if(context.options?.length > 0 && Object.keys(context.conditions).length > 0 && typeof context.settle === 'function')
            //     return true;

            let warnings = [];

            // Valid number of options
            if(!Array.isArray(context.options) || context.options?.length <= 0)
                warnings = [...warnings, ["Incorrect Number of Market Options", context.options]];
            
            // Valid number of winners
            if(context.conditions.winners >= context.options.length)
                warnings = [...warnings, ["Incorrect Number of Market Winners", context.conditions.winners]];

            // Valid number of placers
            // TODO: Improve valid placers logic
            if((context.conditions.winners + context.conditions.place.num >= context.options.length))
                warnings = [...warnings, ["Incorrect Number of Market Placers", context.conditions.place.num]];

            // Valid Settle Function
            if(typeof context.settle !== 'function')
                warnings = [...warnings, ["Market Settle Function not defined", context.settle]];
            
            if(warnings.length === 0)
                return true;

            WARN("Market not Initialised Correctly, cannot open Market", warnings);

            return false;
        },
        validResult: (context, event) => {
            if(event.result === undefined) {
                WARN("Result not defined, cannot settle Market", { ...event.result });
    
                return false;                
            }

            let result = context.settle(event.result, context.conditions);
            result = sanitiseResult(result);

            if(result.win.length !== context.conditions.winners || result.place.length !== context.conditions.place.num)
            {
                WARN("Result has incorrect number of winners and placers", context.conditions, result);

                return false;
            }

            // for (const winner of winners) {
            //     console.log("DEBUG", winner, context.options, winner in context.options);
            //     if(!(context.options.some())) {
            //         WARN("Winner not in Market Options", context.options, winner);
    
            //         return false;
            //     }
            // }
            
            return true;            
        }
    }
});
