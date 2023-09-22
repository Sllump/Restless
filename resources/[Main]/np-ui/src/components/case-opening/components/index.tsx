import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { Button } from '@mui/material';
import useStyles from './index.styles';

var itemList = {
  [1]:[
      {
          name: "★ Karambit | Vanilla",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3ejxQ7dG0nZTFz_WgaurTwzMA6ZFz0-qW99mn0Qzk_EJoYWylJtSXe1c9aAnSq1C8l_Cv28F7-X3KYA"
      },
      {
          name: "★ Karambit | Boreal Forest",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0kfjmNqjFqWle-sBwhtbN_Iv9nBrsqRZlajv6doOWcAE7ZV7TrwLvku7m0Za0vJ7MwCM1uSUg4yzZyh22n1gSOZoaRwNN"
      },
      {
          name: "★ Karambit | Scorched",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0k_bkI7fUqWdY781lxLGZ9Ijz3QW2qEs4ZmqmctWVJg5tYVzR-1Xsle7s0ZW0tMjJySZh6Cg8pSGK6AiJQ6g"
      },
      {
          name: "★ Karambit | Blue Steel",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0lfvhNr_ummJW4NE_273ErN6ti1CxrxZlYjjzIdeRdQA7ZwqD-wC6xu680ZO9uc_AnXVgvz5iuyhtDBWPCg"
      },
      {
          name: "★ Karambit | Forest DDPAT",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0k_PkMq_ummJW4NE_3urEpoiljAHt_BJtZ2HyctCRIVJtaA2DqVntwOnugpK06JnAy3pguD5iuyjR9et7Uw"
      },
      {
          name: "★ Karambit | Urban Masked",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0g_bkNoTEhGlQ5vp9g-7J4cLx2wKw-hA6a2j7JoXEJgY6Z1uB_lPol-2-jcK17pyYnyRnsyEitHjegVXp1i87ARAZ"
      },
      {
          name: "★ Karambit | Bright Water",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0mPTxMrXunWVY7sBOhuDG_Zi7jgXk8xZqZ23zJoOcdgE8YVDU_FK7xOjp05C-6JrNwHUxs3QntC3Yngv330_YiEJY7Q"
      },
      {
          name: "★ Karambit | Safari Mesh",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0mvLnO4TFl2Vu5Mx2gv2P9N7x3Fe3rUplZm2hLYOSIQ4_aAmEr1a8kO-818Ptu86YySRj63Qjs2GdwULDIt1IWg"
      }
  ],
  [2]:[
      {
          name: "★ Karambit | Ultraviolet",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0h-LmI7fUqWdY781lxOqSpYijiwLlrko5MGumLIadIA46ZAzV81Xvx-_q0JK6vp6dzHQ27yU8pSGKE0PchDM"
      },
      {
          name: "★ Karambit | Night",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0mf7zO6_ummJW4NE_3ruWodShigzm_UtrMWCmdoSRJwU2YFrVrFTrkOe6jJ6_tJnOn3Rr7D5iuygwNtqbyw"
      },
      {
          name: "★ Karambit | Doppler Phase 4",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij73--YXygED680pqMjr0IdeUd1drYFnR_QK2x73qg5G-uczMyntmvHYjsSrezhbh0wYMMLJgYOl_1g"
      },
      {
          name: "★ Karambit | Black Laminate",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbuhX9e5sBmi_rJyoD8j1yg5RJoZj2ld4HBIAM5YVuD-FLrl-26gJG_v8uamnYyvXIgtHaPyRPjhhtSLrs4nA9BIsA"
      },
      {
          name: "★ Karambit | Doppler Phase 3",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7r--YXygED6-EtrNmihLYaXIQ83Nw6C-1C6k-zvgMO7up7NmHs2uykl43fYnUG3hQYMMLINmYZu2g"
      },
      {
          name: "★ Karambit | Doppler Phase 1",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7j--YXygED6-kU_Y2HyLYaXeldoZFHYqFa5w-btg8W-7s7PzndkuyJz5CvYzkO0hgYMMLK4xIyRWw"
      },
      {
          name: "★ Karambit | Damascus Steel",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0k_b5MqjSg3hu5Mx2gv2Podv03wKy_EtqMGjzcNXBelM-MgmCqAe5le6508fp75TKnCNqsyYitGGdwUJqhGR_eA"
      },
      {
          name: "★ Karambit | Rust Coat",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0hOPxNrfunWVY7sBOh-zF_Jn4xgDnqko4ZD33IY7DegdrYl3UrAW-ku6-05696JvPmCc2u3UgtniMyxGpwUYbg5r7j18"
      },
      {
          name: "★ Karambit | Stained",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0kfjmML7VqWdY781lxLyVrYqk2VLs8xA4MmCnI9LBcA8_ZAqE_1LqwOm6hpe16J_BmHRj73Q8pSGKRAQrg_M"
      },
      {
          name: "★ Karambit | Freehand",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmOL7VqX5B18N4hOz--YXygED680ttZzjwLNfDIwQ9aVvU8ljvxuzshZe16s7AnHQ2viN05X3cyRWzhgYMMLLqzslpTg"
      }
  ],
  [3]:[
      {
          name: "★ Karambit | Case Hardened",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0mP74Nr_ummJW4NE_37vHrN6n0VDm8kVsNWz2IYHEeg89MFHZqQK4xue5hJe0vc_NwSZqsj5iuyizSJQHPQ"
      },
      {
          name: "★ Karambit | Gamma Doppler Phase 3",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQeLpxo7Oy3td9LDIQZtYVCE_FS8x-fqjZ_vv5mbnHZq7nN25yrdzR221BlFbew7jeveFwu1r0V1Rw"
      },
      {
          name: "★ Karambit | Doppler Phase 2",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7v--YXygED6-BZpNTqicoWXcQ43aV6Br1DqxL--jZO_7svAzXs3uCQg4XyLmhXhhQYMMLKBF8xkUA"
      },
      {
          name: "★ Karambit | Autotronic",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP5gVO8v11pMj_1d4eVelVrYlCG_VDowefpgcC97s-dyXQx6SQqtn6JnECyhR5OcKUx0sEUJJZ_"
      },
      {
          name: "★ Karambit | Gamma Doppler Phase 1",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQWLpxo7Oy3tI4CcIVA8MArW_VfrkOy-gsK7v5_LmnBmsnYn4i2MzB3j0klMbuZsg-veFwtNHI-dng"
      },
      {
          name: "★ Karambit | Slaughter",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NE_0rGVoNvzilG3qkduNmCnd4eSdAE3aVuD_Ve8wOe7hpLuuJuYmyRivj5iuyi_zJQcBA"
      }
  ],
  [4]:[
      {
          name: "Doppler Sapphire",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20hPbkI7PYhG5u5cRjiOXE_JbwjGu4ohQ0J3egI4ORcQNqYw3W8la5w-frgJK77ZXKwCQysyVwtnbayxKzhxlIarRum7XAHvqFh2jA"
      },
      {
          name: "★ Karambit | Gamma Doppler Emerald",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kvrxIbrdklRc6ddzhuzI74nxt1i9rBsofT-ld9LDJgVsY1nX-QLtlejqg5bu7Zydm3Q1uSVzsXmOmUe3ghFKauBxxavJdWR7Gog"
      },
      {
          name: "★ Karambit | Doppler Ruby",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20heL2KoTcl3lT5MB4kOzFyoD8j1yg5UNkaz_xIdfEd1A5aQ3U-lPskunphJHptZvPwSM26CUht3_UmUe3gEpSLrs4ZlidBgY"
      },
      {
          name: "★ Karambit | Doppler Black Pearl",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20lfv1MLDBk2pD5Pp8i_vD-Yn8klGwlB81NDG3OtWTJAdsNVCG-Vjvwrvsh8Dv6szBznVivSMnt3eOlx22hhhNbu1o0PaACQLJyiL9rI8"
      },
      {
          name: "★ Karambit | Marble Fade",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmMbfUqW1Q7MBOhuDG_Zi7jQGw-xVoZGigd4LEI1I2NQyE_ATqlOrtjMfq6ZWanXA3siBx5CyLnQv3309Lv_QKkg"
      }
  ],
  [5]:[
      {
          name: "★ Karambit | Crimson Web",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITdn2xZ_Isn27uQotis3FW1qhZuZWn7JdWWc1I2Zg7R_1a9yLjrh8S475zNzXYypGB8stPjWeRQ"
      },
      {
          name: "★ Karambit | Lore",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbummRD7fp9g-7J4cKi2A3kqhY9Zm6hJ9eXI1RqaVqF-ljowb271564vMyaznA1viF2s3jegVXp1uIYPzxv"
      },
      {
          name: "★ Karambit | Gamma Doppler Phase 2",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQaLpxo7Oy3tcYKVcQRsZF_Q-FTow-zs0Jft7czNmiNluyV35nrbyR2_1UlPaOFp1uveFwtI0RP3qg"
      },
      {
          name: "★ Karambit | Fade",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlYG0kfbwNoTdn2xZ_Ity07iXrdzx3wHnqhc_YT-gd4PAJgRrZV2Eqwe2wOu5g8K47c_MySBkpGB8si99cQGQ"
      },
      {
          name: "★ Karambit | Gamma Doppler Phase 4",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQCLpxo7Oy3tddKScVVvYVzQq1a2lb2615Hu6p7OmHNluCdzsSvazkSyghBEOLNuh-veFwtgyyI7Iw"
      },
      {
          name: "★ Karambit | Tiger Tooth",
          itemid: "karambit",
          img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY60g_7zNqnumXlQ5sJ0teXI8oThxlew_hJlN26ndYfDcwNsZFvW-gS2w-u9gsK0vpvIy3Nj6XUl5HjbmxapwUYbPsZKINM"
      }
  ],
}




const CaseOpening: React.FC = () => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const generate = (ng: number) => {
    setTimeout(() => {
      playAudio();
    }, 500);
    const buttons = document.getElementsByTagName('button');
    Array.from(buttons).forEach((button) => button.remove());
    const raffleRollerHolder = document.querySelector('.raffle-roller-holder');
    if (raffleRollerHolder) {
      raffleRollerHolder.classList.add('line');
    }
    const raffleRollerContainer: any = document.querySelector('.raffle-roller-container');
    if (raffleRollerContainer) {
      raffleRollerContainer.style.transition = 'sdf';
      raffleRollerContainer.style.marginLeft = '0px';
      // raffleRollerContainer.innerHTML = '';
    }
    const itemChance = Math.floor(Math.random() * 100) + 1;
    let level;
    if (itemChance < 35) {
      level = 1;
    } else if (35 <= itemChance && itemChance < 60) {
      level = 2;
    } else if (60 <= itemChance && itemChance < 80) {
      level = 3;
    } else if (80 <= itemChance && itemChance < 95) {
      level = 4;
    } else if (95 < itemChance) {
      level = 5;
    }
    let element = `
 
    `;
    for (let i = 0; i < 101; i++) {
      const randed = Math.floor(Math.random() * 500) + 1;

      if (randed < 35 * 5) {
        element += '<div class="item-common rare-level-1"><div id="CardNumber' + i + '" class="item class_red_item" style="background-image:url(' + itemList[1][Math.floor(Math.random() * itemList[1].length)].img + ');"></div></div>';
      } else if (35 * 5 <= randed && randed < 60 * 5) {
        element += '<div class="item-common rare-level-2"><div id="CardNumber' + i + '" class="item class_red_item" style="background-image:url(' + itemList[2][Math.floor(Math.random() * itemList[2].length)].img + ');"></div></div>';
      } else if (60 * 5 <= randed && randed < 80 * 5) {
        element += '<div class="item-common rare-level-3"><div id="CardNumber' + i + '" class="item class_red_item" style="background-image:url(' + itemList[3][Math.floor(Math.random() * itemList[3].length)].img + ');"></div></div>';
      } else if (80 * 5 < randed && randed <= 95 * 5) {
        element += '<div class="item-common rare-level-4"><div id="CardNumber' + i + '" class="item class_red_item" style="background-image:url(' + itemList[4][Math.floor(Math.random() * itemList[4].length)].img + ');"></div></div>';
      } else if (95 * 5 < randed) {
        element += '<div class="item-common rare-level-5"><div id="CardNumber' + i + '" class="item class_red_item" style="background-image:url(' + itemList[5][Math.floor(Math.random() * itemList[5].length)].img + ');"></div></div>';
      }
    }
    if (raffleRollerContainer) {
      raffleRollerContainer.innerHTML = element;
    }
    setTimeout(() => {
      const itemListRandom = Math.floor(Math.random() * itemList[level].length);
      goRoll(itemList[level][itemListRandom].name, itemList[level][itemListRandom].img, level);
      console.log(itemList[level][itemListRandom].itemid, level);
    }, 500);
  };

  const goRoll = (skin: string, skinimg: string, skinlvl: number) => {
    const raffleRollerContainer: any = document.querySelector('.raffle-roller-container');
    if(raffleRollerContainer) {
      raffleRollerContainer.style.transition = 'all 8s cubic-bezier(.08,.6,0,1)';
      raffleRollerContainer.style.marginLeft = '-6870px';
    }
    setTimeout(() => {
      setShow(false);
      raffleRollerContainer.innerHTML = `
        <div class="item-common rare-level-1">
            <div class="item class_red_item" style='backgroundImage: url(${itemList[1][Math.floor(Math.random() * itemList[1].length)].img})'></div>
        </div>
        <div class="item-common rare-level-1">
            <div class="item class_red_item" style='backgroundImage: url(${itemList[2][Math.floor(Math.random() * itemList[2].length)].img})'></div>
        </div>
        <div class="item-common rare-level-1">
            <div class="item class_red_item" style='backgroundImage: url(${itemList[3][Math.floor(Math.random() * itemList[3].length)].img})'></div>
        </div>
        <div class="item-common rare-level-1">
            <div class="item class_red_item" style='backgroundImage: url(${itemList[5][Math.floor(Math.random() * itemList[5].length)].img})'></div>
        </div>
      `
      // pauseAudio();
    }, 8500);
  };

  // useEffect(() => {
  //   if (!show) {
  //     setTimeout(() => {
        
  //       setShow(true);
  //     }, 500);
  //   }
  // }, [show]);


  return (
    <div style={{display: show ? '' : 'none'}} className={classes.caseOpeningContainer}>
          {/* <div className="main-app-container"> */}
            {/* <div className="main-container-back"> */}
            {/* <div className="main-border" style={{visibility: 'visible'}}> */}
              <div className="raffle-roller">
                <div className="right-holder"></div>
                <div className="raffle-roller-holder">
                  <div className="raffle-roller-container">
                    <div className="item-common rare-level-1">
                      <div className="item class_red_item" style={{backgroundImage:`url(${itemList[1][Math.floor(Math.random() * itemList[1].length)].img})`}}></div>
                    </div>
                    <div className="item-common rare-level-2">
                      <div className="item class_red_item" style={{backgroundImage:`url(${itemList[2][Math.floor(Math.random() * itemList[2].length)].img})`}}></div>
                    </div>
                    <div className="item-common rare-level-3">
                      <div className="item class_red_item" style={{backgroundImage:`url(${itemList[3][Math.floor(Math.random() * itemList[3].length)].img})`}}></div>
                    </div>
                    <div className="item-common rare-level-4">
                      <div className="item class_red_item" style={{backgroundImage:`url(${itemList[5][Math.floor(Math.random() * itemList[5].length)].img})`}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{position:'absolute', bottom:'25px', right:'50%', transform: 'translate(35%, -50%'}}>

                <Button variant="contained" color="primary" onClick={() => generate(1)}>
                  Spin
                </Button>
              </div>
            {/* </div> */}
            {/* </div> */}
        </div>
    // </div>
  );
};

export default CaseOpening;