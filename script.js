class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      equation: ''
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  
  handleClick(value) {
    if(value == '=') {
      try {
        const solution = eval(this.state.equation);
        this.setState(prevState=>({
          currentValue: `${solution}`,
          equation: `${prevState.equation}=${solution}`,
        }));
      } catch(error) {
        this.setState(prevState=>({
          currentValue: prevState.currentValue,
          equation: prevState.equation,
        }));
      }
    }else if(value == 'AC') {
      this.setState(()=>({
        currentValue: '0',
        equation: ''
      }));
    }
    else if ('/*+-'.includes(value)) {
      const currentEquation = this.state.equation;
      const lastChar = currentEquation[currentEquation.length - 1];

      if ('/*+-'.includes(lastChar) && value === '-') {
        const newEquation = currentEquation.slice(0, -1)
        const newLastChar = newEquation[newEquation.length - 1]
        
        if ('/*+-'.includes(newLastChar)) {
          lastChar === '-'
          ? this.setState(prevState => ({
            currentValue: value,
            equation: newEquation + value,
          }))
          : this.setState(prevState => ({
            currentValue: value,
            equation: currentEquation + value,
          }))
        } else {
          currentEquation === '-'
          ? this.setState(prevState => ({
              currentValue: value,
              equation: value,
            }))
          : this.setState(prevState => ({
              currentValue: value,
              equation: currentEquation + value,
            }))
        }
      } else if ('/*+-'.includes(lastChar) && value !== '-') {
        
        
        const newEquation = currentEquation.slice(0, -1)
        const newLastChar = newEquation[newEquation.length - 1]
        
        if ('/*+-'.includes(newLastChar)) {
          this.setState(prevState => ({
            currentValue: value,
            equation: newEquation.slice(0, -1) + value,
          })) 
        } else {
         this.setState(prevState => ({
            currentValue: value,
            equation: currentEquation.slice(0, -1) + value,
          }));
        }  
      } else {
          if (currentEquation.includes('=')) {
            const newEquation = currentEquation.split('=')
            this.setState(prevState => ({
              currentValue: value,
              equation: newEquation[1] + value,
            }));
          } else {
            this.setState(prevState => ({
              currentValue: value,
              equation: currentEquation + value,
            }));
          }
      }
  }
    else if(value == '.') {
      
      this.setState(prevState => ({
        currentValue: 
          prevState.currentValue.includes('.')
            ? prevState.currentValue
            : prevState.currentValue + value,
        equation: prevState.equation + value,
      }))
    }
    else {
      if (this.state.currentValue.length > 20) {
        const currentValue = this.state.currentValue
        this.setState(prevState => ({
          currentValue: 'DIGIT LIMIT MET'
        }))
        setTimeout(()=>{
          this.setState(prevState => ({
          currentValue: currentValue,
          equation: prevState.equation
        }))
        },1000)
      } else {
        this.setState(prevState => ({
          currentValue:
            '0/*-+'.includes(prevState.currentValue) || prevState.equation.includes('=')
              ? value
              : prevState.currentValue == 'DIGIT LIMIT MET'
              ? prevState.currentValue
              : prevState.currentValue + value,
          equation: 
            '0/*+'.includes(prevState.currentValue) && '0/*+'.includes(prevState.equation) || prevState.equation.includes('=')
            ? value
            : prevState.currentValue == 'DIGIT LIMIT MET'
            ? prevState.equation
            : prevState.equation + value
        }));
      }
    }
  }
  
  componentDidMount() {
    document.addEventListener('keypress', this.handleEvent);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleEvent);
  }
  
  handleEvent(event) {
     buttons.forEach((button)=>{
       if (button.value == event.key) {
          this.handleClick(event.key)
       }
     })
     // console.log(event)
  }
  
  render() {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
         <div className='w-[350px] bg-black p-2'>
           <div
            // id='display'
            className='w-full text-right'
            >
              <div 
              className='w-full min-h-[30px] break-all font-mono text-yellow-400'
              >{this.state.equation}</div>
              <div id='display' className='w-full font-mono text-2xl text-white'>{this.state.currentValue}</div>
            </div>

            <div className='w-full grid grid-rows-5 grid-cols-4 gap-[1px]'>
                {
                  buttons.map(button => (
                    <button 
                    id={button.id}
                    key={button.id}
                     className={`${
                        button.value === 'AC' 
                          ? 'col-span-2 bg-[#ac3939]' 
                          : button.value === '0' 
                          ? 'col-span-2 bg-[#4d4d4d]' 
                          : button.value === '=' 
                          ? 'row-span-2 h-auto bg-[#004466]'
                          : '*/+-'.includes(button.value)
                          ? 'bg-[#666666]'
                          : 'bg-[#4d4d4d]'
                      } ${buttonsStyle}`}
                    onClick={() => this.handleClick(button.value)} >
                      {button.value}
                    </button>
                  ))
                }
              </div>
          </div>
          <em
          style={{
                fontSize:'24px',
                color:'#004466',
                marginTop: '30px'
          }}  
          >Designed by Obiora Sopuluchukwu Emmanuel</em>
        </div>
    )
  }
}
  
const buttonsStyle = 'hover:border-2 hover:border-gray-200 w-full h-[75px] text-white hover:text-black';  
const buttons = [
    {
      id:'clear',
      value: 'AC',
    },
    {
      id:'divide',
      value: '/',
    },
    {
      id:'multiply',
      value: '*',
    },
    {
      id:'seven',
      value: '7',
    },
    {
      id:'eight',
      value: '8',
    },
    {
      id:'nine',
      value: '9',
    },
    {
      id:'subtract',
      value: '-',
    },
     {
      id:'four',
      value: '4',
    },
    {
      id:'five',
      value: '5',
    },
    {
      id:'six',
      value: '6',
    },
    {
      id:'add',
      value: '+',
    },
    {
      id:'one',
      value: '1',
    },
    {
      id:'two',
      value: '2',
    },
    {
      id:'three',
      value: '3',
    },
    {
      id:'equals',
      value: '=',
    },
    {
      id:'zero',
      value: '0',
    },
    {
      id:'decimal',
      value: '.',
    },
  ]

ReactDOM.render(<App/>,document.getElementById('root'))