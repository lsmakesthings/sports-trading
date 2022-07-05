import { interpret } from 'xstate';
import { eventMachine } from './event.js';
import { marketMachine } from './markets.js';

const eventService = interpret(eventMachine)
  .onTransition((state, event) => console.log("EVENT_MACHINE", event, state.value))
  .start();

eventService.send({ type: 'INIT', markets: ['match'] });
eventService.send({ type: 'INIT', competitors: ['Home', 'Away'] });
eventService.send('START');
eventService.send({ type: 'END', result: 'Home'});
eventService.send({ type: 'SETTLE', confirmed: true });

console.log('EVENT_MACHINE_CONTEXT', eventService.state.value, eventService._state.context);

const marketService = interpret(marketMachine)
.onTransition((state, event) => console.log("MARKET_MACHINE", event, state.value))
.start();

// Over/Under Market
// marketService.send({ type: 'INIT', options: ['Over', 'Under'] });
// marketService.send({ type: 'INIT', conditions: { winners: 1, goals: 2.5 } });
// marketService.send({ type: 'INIT', settle: (result, conditions) => {
//     return (result > conditions.other.goals) ? 'Over' : 'Under';
// } });
// marketService.send({ type: 'SETTLE', result: 3 });

// Race Market
marketService.send({ type: 'INIT', options: ['A', 'B', 'C', 'D', 'E', 'F'] });
marketService.send({ type: 'INIT', conditions: { winners: 1, place: { num: 3, term: 4 } } });
marketService.send({ type: 'INIT', settle: (result, conditions) => {
    return {
        win: result.slice(0, conditions.winners),
        place: result.slice(conditions.winners, conditions.winners+conditions.place.num)
    };
} });
marketService.send({ type: 'SETTLE', result: ['R', 'B', 'A', 'D', 'E', 'F'] });

console.log('MARKET_MACHINE_CONTEXT', marketService.state.value, marketService._state.context);