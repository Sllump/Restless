local registered = {}

function RegisterInterfaceCallback(name, cb)
  local function interceptCb(data, innerCb)
    cb(data, function(result)
      if result.meta.ok then
        result.meta.message = "done"
      end
      innerCb(result)
    end)
  end
  AddEventHandler(('_vpx_uiReq:%s'):format(name), interceptCb)

  if (GetResourceState("erp-interface") == "started") then 
    exports["erp-interface"]:RegisterIntefaceEvent(name) 
  end

  registered[#registered + 1] = name
end

function SendInterfaceMessage(data)
  exports["erp-interface"]:SendInterfaceMessage(data)
end

function SetInterfaceFocus(hasFocus, hasCursor)
  exports["erp-interface"]:SetInterfaceFocus(hasFocus, hasCursor)
end

function GetInterfaceFocus()
  return exports["erp-interface"]:GetInterfaceFocus()
end

AddEventHandler("_vpx_uiReady", function()
  for _, eventName in ipairs(registered) do
    exports["erp-interface"]:RegisterIntefaceEvent(eventName)
  end
end)