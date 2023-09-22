import React, { useState, useEffect } from 'react';
import './index.css'
import useStyles from './index.styles';
import { Button, FormControl, Input, Stack, Select, InputLabel, Slider, ButtonGroup, Tooltip, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function ClothingMenu() {
  const classes = useStyles();

  const [Show, setShow]: any = useState(false);
  const [modal, setModal]: any = useState(false);
  const [menus, setMenus] = useState([]);
  const [subMenus, setSubMenus] = useState([
    {
        name: "Clothing",
        icon: "fas fa-tshirt",
        path: "clothing",
        isActive: true
    },
    {
        name: "Accessories",
        icon: "fas fa-vest-patches",
        path: "aksesuar",
        isActive: false
    },
    {
        name: "Peds",
        icon: "fas fa-people-arrows",
        path: "peds",
        isActive: false
    },
]);
  const [currentSidebarTabs, setCurrentSidebarTabs]: any = useState(0);
  const [buttons, setButtons] = useState([
    {
      name: "Hat",
      path: "hat",
      icon: "fas fa-hat-cowboy-side fa-fw fa-w-14",
      isActive: false,
    },
    {
      name: "Mask",
      path: "mask",
      icon: "fas fa-mask fa-fw fa-w-14",
      isActive: false,
    },
    {
      name: "Glasses",
      path: "glasses",
      icon: "fas fa-glasses fa-fw fa-w-14",
      isActive: false,
    },
    {
      name: "Shirt",
      path: "tshirt",
      icon: "fas fa-tshirt fa-fw fa-w-14",
      isActive: false,
    },
    {
      name: "Bag",
      path: "bag",
      icon: "fas fa-shopping-bag fa-fw fa-w-14",
      isActive: false,
    },
    {
      name: "Pants",
      path: "pants",
      icon: "fas fa-drumstick-bite fa-fw fa-w-14",
      isActive: false,
    },
    {
      name: "shoes",
      path: "shoes",
      icon: "fas fa-socks fa-fw fa-w-14",
      isActive: false,
    },
  ]);
  const SetActiveButton = (id) => {
    let g = buttons[id];
    g.isActive = g.isActive ? false : true;

    setButtons([...buttons.slice(0, id), g, ...buttons.slice(id + 1)]);
  };
  const setSubMenuActive = (index) => {
    let oldIndex = subMenus.findIndex((x) => x.isActive == true);
    if (oldIndex !== -1) {
      let x = subMenus[oldIndex];
      x.isActive = false;

      setSubMenus([
        ...subMenus.slice(0, oldIndex),
        x,
        ...subMenus.slice(oldIndex + 1),
      ]);
    }
    // if (oldIndex) nw[oldIndex].isActive = ;
    let g = subMenus[index];
    g.isActive = true;

    setSubMenus([...subMenus.slice(0, index), g, ...subMenus.slice(index + 1)]);
  };




  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data

    if ('clothing' === data.app) {
      if (true === dvexdata.show){
        setShow(true)
        console.log(JSON.stringify(dvexdata.subMenus), dvexdata.type)
        setSubMenus(dvexdata.subMenus)
        getShop(dvexdata.type)
      }
    }
  })


  const getShop = (shop) => {
    setMenus([]);
    fetchNui("np-clothing:getMenus", shop).then((data) => {
    //  console.log(data);
      setMenus(data ?? []);
    });
  };



  return (
    <>
      <div style={{display: Show ? '' : 'none'}} className={classes.clothingMenuContaner}>
        <div className={classes.clothingLeftSidebar}>
          {/* <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-hat-cowboy-side fa-fw fa-w-14'></i>
          </div>
          <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-mask fa-fw fa-w-14'></i>
          </div>
          <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-glasses fa-fw fa-w-14'></i>
          </div>
          <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-tshirt fa-fw fa-w-14'></i>
          </div>
          <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-shopping-bag fa-fw fa-w-14'></i>
          </div>
          <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-drumstick-bite fa-fw fa-w-14'></i>
          </div>
          <div className={classes.clothingLeftSideBarTab}>
            <i style={{color: 'white', fontSize: '15px'}} className='fas fa-socks fa-fw fa-w-14'></i>
          </div> */}
          {buttons.map((button, id) => (
            <Tooltip arrow title={button.name} placement="left">
              <div style={{background: button.isActive ? "rgb(48,71,94)" : "rgb(34,40,49)"}}
                onClick={() => {
                  SetActiveButton(id);
                  // fetchNui("handleClothe", button.path); 
                }} className={classes.clothingLeftSideBarTab}>

                <i style={{color: 'white', fontSize: '15px'}} className={button.icon}></i>
              </div>
            </Tooltip>
          ))}
        </div>
        <div className={classes.clothingContainer}>
          <div className={classes.clothingHeader}>
            <div className={classes.clothingHeaderInner}>
              <div style={{marginTop:'20px'}}>
                <Typography style={{color: 'rgb(174,213,129)', wordBreak: 'break-word', fontWeight: 500}} variant="h6" gutterBottom>
                  $0.00 Incl. 15% tax
                </Typography>
              </div>
              <div style={{marginTop:'20px'}}>
                <ButtonGroup sx={{borderRadius: '3px', fontSize: '11px'}} variant='contained' disableElevation={true}>
                  <Button onClick={() => setModal(!modal)} style={{fontSize: '13px', fontWeight: 500, paddingLeft:'20px', paddingRight:'20px'}} size='small' color='success' variant='contained'>Pay</Button>
                  <Button style={{fontSize: '13px', fontWeight: 500, paddingLeft:'15px', paddingRight:'15px'}} size='small' color='warning' variant='contained'>Exit</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className={classes.clothingInnerContainerWrapper}>
            {Show &&
              menus.map((data) =>
              // <ColorPallete _data={m} />
              // {console.log(m.isColor)}
                {if(data.isColor){
                  return (
                    <ColorPallete _data={data} />
                  );
                }else{
                  return (
                    <Item _data={data} />
                  );
                } 
                }
              )}
          </div>
        </div>
        <div className={classes.clothingRightSidebar}>
          <div className={classes.clothingRightSidebarInner}>
            <div className={classes.clothingRightSidebarIcon}>
              <img style={{height: '45px'}} src="https://i.imgur.com/N4vNhB3.png" alt="icon" />
            </div>
            <div className={classes.clothingRightSidebarTabs}>
              {/* <Tooltip arrow placement="left" title="Parent">
                <div onClick={()=>{setCurrentSidebarTabs(0)}} style={{background: 0 === currentSidebarTabs ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                    <i style={{color: 'white', fontSize: '30px'}} className='fas fa-female fa-fw fa-w-14'></i>
                </div>
              </Tooltip>
              <Tooltip arrow placement="left" title="Face">
                <div onClick={()=>{setCurrentSidebarTabs(1)}} style={{background: 1 === currentSidebarTabs ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                    <i style={{color: 'white', fontSize: '30px'}} className='fas fa-smile fa-fw fa-w-14'></i>
                </div>
              </Tooltip>
              <Tooltip arrow placement="left" title="Skin">
                <div onClick={()=>{setCurrentSidebarTabs(2)}} style={{background: 2 === currentSidebarTabs ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                    <i style={{color: 'white', fontSize: '30px'}} className='fas fa-meh-blank fa-fw fa-w-14'></i>
                </div>
              </Tooltip>
              <Tooltip arrow placement="left" title="Hair/Beards">
                <div onClick={()=>{setCurrentSidebarTabs(3)}} style={{background: 3 === currentSidebarTabs ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                    <i style={{color: 'white', fontSize: '30px'}} className='fas fa-cut fa-fw fa-w-14'></i>
                </div>
              </Tooltip>
              <Tooltip arrow placement="left" title="Makeup">
                <div onClick={()=>{setCurrentSidebarTabs(4)}} style={{background: 4 === currentSidebarTabs ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                    <i style={{color: 'white', fontSize: '30px'}} className='fas fa-palette fa-fw fa-w-14'></i>
                </div>
              </Tooltip>
              <Tooltip arrow placement="left" title="All">
                <div onClick={()=>{setCurrentSidebarTabs(5)}} style={{background: 5 === currentSidebarTabs ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                    <i style={{color: 'white', fontSize: '30px'}} className='fas fa-cloud-upload-alt fa-fw fa-w-14'></i>
                </div>
              </Tooltip> */}
              {subMenus.map((data, index) => (
                <Tooltip arrow placement="left" title={data.name}>
                  <div onClick={() => {
                    getShop(data.path);
                    setSubMenuActive(index);
                  }} style={{background: data.isActive ? 'rgb(34, 40, 49)' : '#30475e'}} className={classes.clothingRightSidebarTab}>
                      <i style={{color: 'white', fontSize: '30px'}} className={`${data.icon} fa-fw fa-w-14`}></i>
                  </div>
                </Tooltip>
              ))}

            </div>
          </div>
        </div>
      </div>
      <div style={{display: modal ? '' : 'none'}} className={classes.clothingModalContainer}>
        <div style={{position:'relative', display: 'flex', opacity: Show ? 1 : 0, backgroundColor: 'rgb(34, 40, 49)', width: '550px', height: '130px', borderRadius: '4px', transition: 'all 800ms ease 0s'}}>
          <div style={{display: 'flex', flexDirection: 'column', padding: '2vh'}}>
            <div style={{paddingBottom: '7%'}}>
            </div>
            <div style={{position:'absolute', top:'15%', left:'3.5%'}}>
              <Typography style={{color: '#fff', wordBreak: 'break-word', fontWeight: 400}} variant="h6" gutterBottom>
                Total: <span style={{color: '#85bb65'}}>$0.00 Incl. 15% tax</span>
              </Typography>
            </div>
            <div style={{position:'absolute', bottom:'15%', left:'3.5%'}}>
              <Stack direction='row' spacing={8.8}>
                <Button style={{fontSize: '12px'}} size='small' color='success' variant='contained'>Pay Cash</Button>
                <Button style={{fontSize: '12px'}} size='small' color='success' variant='contained'>Pay Bank</Button>
                <Button style={{fontSize: '12px'}} size='small' color='warning' variant='contained'>Discard</Button>
                <Button onClick={function(){setModal(false)}} style={{fontSize: '12px'}} size='small' color='error' variant='contained'>Go Back</Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


function ColorPallete({ _data }: any) {
  const [data, setData] = useState(_data);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentTextureIndex, setCurrentTextureIndex] = useState(1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active){

    }
      // fetchNui("changeHairColor", {
      //   currentIndex,
      //   currentTextureIndex,
      //   type: data.type,
      //   id: data.id,
      // });
  }, [currentIndex, currentTextureIndex]);

  return (
    <div style={{width:'95%', borderBottom:'1px solid #c8c6ca'}} className="w-full mb-5 border-b border-[#c8c6ca] bg-[#30475e] rounded rounded-b-none p-2 text-[#e0e0e0] relative">
      <div className="w-full" onClick={() => setOpen(!open)}>
        <Typography style={{color:'white'}} variant="h6">{data.name}</Typography>
      </div>
      {open && (
        <div
          className="flex flex-col"
          style={{ padding: "8px 12px 0px", color: "#c8c6ca" }}
        >
          <Typography style={{color:'white'}} variant="h6">{data.colorLabel}</Typography>
          <div
            className="grid max-w-[50%]"
            style={{
              gridTemplateRows: "repeat(8, 1fr)",
              gridTemplateColumns: "repeat(8, 1fr)",
            }}
          >
            {_data.colors.map((color) => (
              <div
                className="border w-[43px] h-[43px] cursor-pointer"
                onClick={() => {
                  setActive(true);
                  setCurrentIndex(color.id);
                }}
                style={{
                  border: currentIndex === color.id ? "3px solid rgb(21, 101, 192)" : "1.5px solid rgb(255, 255, 255)",
                  backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                }}
              ></div>
            ))}
          </div>
          {data.secondaryColorLabel && (
            <div>
              <Typography style={{color:'white'}} variant="h6">{data.secondaryColorLabel}</Typography>
              <div
                className="grid max-w-[50%]"
                style={{
                  gridTemplateRows: "repeat(8, 1fr)",
                  gridTemplateColumns: "repeat(8, 1fr)",
                }}
              >
                {_data.highlight.map((color) => (
                  <div
                    className="border w-[43px] h-[43px] cursor-pointer"
                    onClick={() => {
                      setActive(true);
                      setCurrentTextureIndex(color.id);
                    }}
                    style={{
                      border: currentIndex === color.id ? "3px solid rgb(21, 101, 192)" : "1px solid rgb(255, 255, 255)",
                      backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



function Item({ _data }) {
  const [data, setData] = useState(_data);

  const Buttons = ({ clotheData, setMainData }) => {
    const [data, setData] = useState(clotheData ?? []);
    const [currentIndex, setIndex] = useState(data.currentIndex ?? 0);
    const [textures, setTextures] = useState([])
    const [first, setFirst] = useState({
      currentIndex: data.currentIndex ?? 0,
      indexChanged: false,
      currentTextureIndex: data.currentTextureIndex ?? 0,
      textureChanged: false
    });
    const [changed, setChanged] = useState(false);
    const [currentTextureIndex, setTextureIndex] = useState(
      data.currentTextureIndex ?? 0
    );

    useEffect(() => {
      const x = () => {
        if (!data.componentSettings.texture) return
        var tab = []
        for (var i = 0; i <= data.componentSettings.texture.max; i++) {
          tab.push(i)
        }

        setTextures(tab)


      }

      x()
    }, [])

    useEffect(() => console.log())

    useEffect(() => {
      if (changed) {
        fetchNui("np-clothing:ui:onChange", {
          ...data,
          currentIndex: currentIndex,
          currentTextureIndex: currentTextureIndex,
        });
       // fetchNui("handlePrice");
      }
    }, [currentIndex, currentTextureIndex]);


    useEffect(() => {
      if (changed) {
        setTextureIndex(0);
        // fetchNui("getComponentSettings", data).then((_data) => {
        //   setData({ ...data, componentSettings: _data });
        // });
      }
    }, [currentIndex]);

    const updateIndex = (type, val, texture) => {
      setChanged(true);
      // fetchNui("handlePrice");
      if (val) {
        if (texture) {
          var newVal = parseInt(val);
          if (parseInt(val) > data.componentSettings.texture.max)
            newVal = data.componentSettings.texture.min;
          if (parseInt(val) < data.componentSettings.texture.min)
            newVal = data.componentSettings.texture.max;

          setTextureIndex(newVal);
        } else {
          var newVal = parseInt(val);

          if (newVal > data.componentSettings.drawable.max)
            newVal = data.componentSettings.drawable.min;
          if (newVal < data.componentSettings.drawable.min)
            newVal = data.componentSettings.drawable.max;

          setIndex(newVal);
        }
      } else {
        let number = type == "up" ? 1 : -1;

        if (texture) {
          setTextureIndex((currentVal) => {
            if (currentVal + number < data.componentSettings.texture.min)
              return data.componentSettings.texture.max;

            if (currentVal + number > data.componentSettings.texture.max)
              return 0;

            return currentVal + number;
          });
        } else {
          setIndex((currentVal) => {
            if (currentVal + number < data.componentSettings.drawable.min)
              return data.componentSettings.drawable.max;

            if (currentVal + number > data.componentSettings.drawable.max)
              return 0;

            return currentVal + number;
          });
        }
      }
    };

    return (
      <div>
        <div className="flex items-center justify-between gap-1">
          <ButtonGroup>
            <Button
              variant="contained"
              color="error"
              onClick={() => updateIndex("down", null, false)}
              sx={{
                borderBottomRightRadius: "0",
                borderTopRightRadius: "0",
                minWidth: "40px",
                minHeight: "36px",
              }}
            >
              <FaChevronLeft />
            </Button>
            <input
              className="bg-transparent outline-none border-b text-center max-w-[90px]"
              value={currentIndex}
              style={{fontFamily:'roboto'}} 
              onChange={(e) => updateIndex(null, e.target.value, false)}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => updateIndex("up", null, false)}
              sx={{
                borderBottomLeftRadius: "0",
                borderTopLeftRadius: "0",
                color: "black",
              }}
            >
              {" "}
              <FaChevronRight />{" "}
            </Button>
          </ButtonGroup>
          {data.componentSettings.texture && !data.useSlider && (
            <ButtonGroup>
              <Button
                variant="contained"
                color="error"
                onClick={() => updateIndex("down", null, true)}
                sx={{
                  borderBottomRightRadius: "0",
                  borderTopRightRadius: "0",
                  minWidth: "40px",
                  minHeight: "36px",
                }}
              >
                <FaChevronLeft />
              </Button>
              <input
                className="bg-transparent outline-none border-b text-center max-w-[90px]"
                value={currentTextureIndex}
                style={{fontFamily:'roboto'}}
                onChange={(e) => updateIndex(null, e.target.value, true)}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => updateIndex("up", null, true)}
                sx={{
                  borderBottomLeftRadius: "0",
                  borderTopLeftRadius: "0",
                  color: "black",
                }}
              >
                {" "}
                <FaChevronRight />{" "}
              </Button>
            </ButtonGroup>
          )}

          {data.useSlider == true && (
            <div className="w-full">
              <Slider
                size="small"
                defaultValue={currentTextureIndex}
                max={data.componentSettings.drawable.max}
                min={data.componentSettings.drawable.min}
                color="primary"
                onChange={(e, newVal) => setTextureIndex(newVal)}
              />
            </div>
          )}
        </div>

        {data.componentSettings.texture && !data.disableSelect && (
          <FormControl
            variant="standard"
            sx={{ minWidth: "100%", marginTop: ".5rem" }}
          >
            <InputLabel color="info" id="demo-simple-select-standard-label">
              {data.componentSettings.texture.max} Texture
            </InputLabel>
            <Select
              label="Texture"
              color="info"
              // value={1}
              onChange={(e) => {
                updateIndex(null, e.target.value, true)
              }}
            >
              {textures &&
                textures.map((val, key) => (
                  <MenuItem value={parseInt(val)}>Texture {val}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        )}
      </div>
    );
  };

  const Sliders = ({ clotheData }) => {
    const [data, setData] = useState(clotheData);
    const [currentIndex, setIndex] = useState(data.currentIndex ?? 0);
    const [active, setActive] = useState(false);


    const handleChange = (e, newValue) => {
      setActive(true);
      setIndex(newValue);
    };

    useEffect(() => {
      if (active){
        
      }
        fetchNui("np-clothing:ui:onChange", { ...data, currentIndex: currentIndex });
    }, [currentIndex]);

    return (
      <div className="m-[6px] w-full">
        <Slider
          size="small"
          defaultValue={currentIndex}
          max={data.componentSettings.drawable.max}
          color="primary"
          onChange={handleChange}
          sx={{ width: "100%" }}
        />
      </div>
    );
  };

  const Multi = (clotheData) => {
    const [data, setData] = useState(clotheData);

    const Item = ({ itemData }) => {
      const [item, setItem] = useState(itemData);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [active, setActive] = useState(false);

      useEffect(() => {
        if (active){

        }
          fetchNui("np-clothing:ui:onChange", { ...item, currentIndex: currentIndex });
      }, [currentIndex]);

      return (
        <div
          className={`${
            itemData.width == "full" ? "w-full" : "w-[50%]"
          } p-[10px] inline-flex`}
        >
          <div className="w-full">
            <Typography style={{color:'white'}}>{item.name}</Typography>
            <Slider
              size="small"
              defaultValue={currentIndex}
              max={item.componentSettings.max}
              min={item.componentSettings.min}
              color="primary"
              onChange={(e: any, val: any) => {
                setActive(true);
                setCurrentIndex(parseInt(val));
              }}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      );
    };

    useEffect(() => {
      //console.log();
    }, []);

    return (
      <div style={{
        display:'flex',
        flexWrap:'wrap',
      }} className="w-full">
        {/* {JSON.stringify(data)} */}

        {data.clotheData.map((item) => (
          <Item itemData={item} />
        ))}
      </div>
    );
  };

  return (
    <div style={{width:'95%'}} className="mt-[5%] w-full mb-2 bg-[#30475e] rounded rounded-b-none p-2 text-[#e0e0e0] relative">
      <div className="flex w-full">
        <div
          className="flex flex-col relative justify-between overflow-hidden"
          style={{ alignContent: "space-between", flex: "1 1" }}
        >
          <div>
            <Typography style={{color:'white'}} variant="h5">{data.name}</Typography>
          </div>

          <div>
            <div>
              {data.multi ? (
                <Multi clotheData={data.multi} />
              ) : (
                <div className="w-full">
                  <Typography variant="body2">
                    {data.componentSettings.drawable.max} components
                  </Typography>
                  <div className="flex justify-between items-center gap-2">
                    {!data.slider ? (
                      <Buttons clotheData={data} setMainData={setData} />
                    ) : (
                      <Sliders clotheData={data} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ClothingMenu;