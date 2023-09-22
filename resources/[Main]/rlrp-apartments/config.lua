
MenuData = {
  apartment_check = {
    {
      title = "Apartment",
      description = "Forclose Apartment",
      key = "judge",
      children = {
          { title = "Yes", action = "rlrp-apartments:handler", key = { forclose = true} },
          { title = "No", action = "rlrp-apartments:handler", key = { forclose = false } },
      }
    }
  }
}
