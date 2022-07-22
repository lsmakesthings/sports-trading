#[allow(dead_code)]
#[derive(Debug)]
enum EventState {
    INACTIVE = 0,
    PRE,
    INPLAY,
    COMPLETE,
    SETTLED
}

impl EventState {
    fn open(&mut self) {
        *self = EventState::PRE;
    }
}

#[allow(dead_code)]
#[derive(Debug)]
struct EventResult {
    winners: Vec<String>,
    placers: Vec<String>
}

impl EventResult {
    fn new() -> EventResult {
        EventResult {
            winners: Vec::new(),
            placers: Vec::new()
        }
    } 
}

#[allow(dead_code)]
#[derive(Debug)]
struct EventContext {
    competitors: Vec<String>,
    // markets: Vec<Markets>,
    // contracts: Vec<Contracts>,
    result: EventResult,
    confirmed: bool
}

impl EventContext {
    fn new() -> EventContext {
        EventContext {
            competitors: Vec::new(),
            // markets: Vec::new(),
            // contracts: Vec::new(),
            result: EventResult::new(),
            confirmed: false
        }
    }
}

#[allow(dead_code)]
#[derive(Debug)]
struct EventMachine {
    state: EventState,
    context: EventContext
}

impl EventMachine {
    fn new() -> EventMachine {
        EventMachine {
            state: EventState::INACTIVE,
            context: EventContext::new()
        }
    }
}

fn main ()
{
    let mut event = EventMachine::new();
    event.state.open();
    println!("{:?}", event);
}