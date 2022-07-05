import { WARN } from './utils.js';
import { assign, createMachine, interpret } from 'xstate';

export const eventMachine = createMachine({
    id: 'event',
    initial: 'inactive',
    context: {
        competitors: [],
        markets: [],
        contracts: [],
        result: {},
        confirmed: false
    },
    states: {
        inactive: {
            always: [
                { target: 'pre', cond: 'isInitialised' }
            ],
            on: { 
                INIT: { target: 'inactive', actions: 'initialise' },
                OPEN: { target: 'pre', cond: 'isInitialised' }
            }
        },
        pre: {
            on: { START: 'inplay' }
        },
        inplay: {
            on: {
                END: { target: 'complete', actions: 'result'}
            }
        },
        complete: {
            on: {
                SETTLE: { target: 'settled', actions: 'confirm', cond: 'canSettle' }
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
            competitors: (context, event) => event.competitors ?? context.competitors,
            markets: (context, event) => event.markets ?? context.markets,
        }),
        result: assign({
            result: (context, event) => event.result
        }),
        confirm: assign({
            // TODO: Check no markets are suspended
            confirmed: (context, event) => event.confirmed
        })
    },
    guards: {
        isInitialised: (context) => {
            if((context.competitors?.length > 0 && context.markets?.length > 0))
                return true;
            
            WARN('Event not Initialised Correctly, cannot move on', context)

            return false;
        },
        canSettle: (context, event) => {
            return context.result !== {} && context.confirmed === true;
        }
    }
});

