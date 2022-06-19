# Sports Trading

## TL:DR

[TODO] - Add TL:DR

## Overview

This is project to develop tools to aid and automate my sports trading on betting exchange platforms such as Betfair Exchange and Smarkets. The aim is to have tools that model the exchange environment with Markets within Events that allow back/lay bets or contracts to be made within them, and are setlled based on the State of those Events. Those tools will be linked with the API's of the exchange platforms to enable manually and hopefully automated trading on various sporting events.

Other tools that are planned in this project include simple bet calculators, matched betting calculators including a tool for exploring the outcome of using the Bet365 2up Offer.

Future development of this project could include modelling and/or simulating the outcome of sporting events using the available statistics to increase the success of my sports trading

## Development Plan

My plan for this project is for it mostly to be written in Rust for it's performance and unique memory safety features that it offers. The main trading tools will be written as a Rust library, initially with a basic CLI, but eventually that library will be inluded in a native desktop application using Tauri, and also a web application by compiling to WebAssembly. In both of those cases the current plan is to use Svelte as the frontend, but this may change in the future depending on my experiences in using it during this project.

To connect the library to the various betting exchange platforms I may have to develop the Rust source code to use directly, but sample code bases are available in various languages.