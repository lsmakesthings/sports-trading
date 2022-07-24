#[allow(dead_code)]
#[derive(Debug)]
enum State {
    INACTIVE = 0,
    PRE,
    INPLAY,
    COMPLETE,
    SETTLED
}

#[allow(dead_code)]
#[derive(Debug)]
enum ResultType {
    ORDER = 0,
    SCORE,
    LIST
}

#[allow(dead_code)]
//#[derive(Debug)]
type OrderResult = Vec<String>;

#[allow(dead_code)]
#[derive(Debug)]
struct ScoreResult(u32, u32);

#[allow(dead_code)]
#[derive(Debug)]
struct ResultData {
    order: OrderResult,
    score: ScoreResult
}

impl ResultData {
    fn new() -> ResultData {
        ResultData {
            order: OrderResult::new(),
            score: ScoreResult(0,0)
        }
    }    
}

#[allow(dead_code)]
#[derive(Debug)]
struct Result {
    type_: ResultType,
    data: ResultData
}

impl Result {
    fn new() -> Result {
        Result {
            type_: ResultType::ORDER,
            data: ResultData::new()
        }
    } 
}

#[allow(dead_code)]
#[derive(Debug)]
struct Context {
    competitors: Vec<String>,
    // markets: Vec<Markets>,
    // contracts: Vec<Contracts>,
    result: Result,
    confirmed: bool
}

impl Context {
    fn new() -> Context {
        Context {
            competitors: Vec::new(),
            // markets: Vec::new(),
            // contracts: Vec::new(),
            result: Result::new(),
            confirmed: false
        }
    }
}

#[allow(dead_code)]
#[derive(Debug)]
struct Machine {
    state: State,
    context: Context
}

#[allow(dead_code)]
#[derive(Debug)]
enum Events {
    INIT=0,
    OPEN,
    START,
    END,
    SETTLE
}

impl Machine {
    fn new() -> Machine {
        Machine {
            state: State::INACTIVE,
            context: Context::new()
        }
    }

    fn send(&mut self, event: Events) {
        println!("Recieved: {:?}", event);
        match self.state {
            State::INACTIVE => {
                // TODO: Validate Initialisation
            },
            State::PRE => {},
            State::INPLAY => {},
            State::COMPLETE => {},
            State::SETTLED => {}
        } 
    }
}

fn main () {
    let mut event = Machine::new();
    event.send(Events::OPEN);
    println!("{:?}", event);
}