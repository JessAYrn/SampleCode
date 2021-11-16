# Digital-Time-Capsule

in order to get the test Internet_Identity canister to work, you must do the following steps:

## Running Internet-Identity canister Locally

To run the internet_identity canisters, proceed as follows after cloning the internet_identity repository

Within the internet-identity project

replace the "build" within the dfx.json file of the Internet-Identity repo from {"src/internet_identity/build.sh"} to {"cargo build --release --target wasm32-unknown-unknown"}
next run the following commands in the Internet-Identity project directory

npm ci /* or in the event this doesn't work just run the following command then perform the rest of the steps that follow this step: npm i) */

dfx start [--clean] [--background]


In a different terminal, run the following command to install the Internet Identity canister:


II_ENV=development dfx deploy --no-wallet --argument '(null)'

## Running the Digital-Time-Capsule canister Locally

//TODO: finish documenting this