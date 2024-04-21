#![no_main]
// If you want to try std support, also update the guest Cargo.toml file
#![no_std] // std support is experimental

use risc0_zkvm::guest::env;

risc0_zkvm::guest::entry!(main);

fn main() {
    // TODO: Implement your guest code here

    // read the input
    let longitude: u32 = env::read();
    let latitude: u32 = env::read();
    let proximity: u32 = env::read();
    let user_lat: u32 = env::read();
    let user_long: u32 = env::read();

    // TODO: do something with the input - check if the user is within the proximity of the location
    let isUserInProximity =
        (user_lat - latitude).abs() <= proximity && (user_long - longitude).abs() <= proximity;

    // write public output to the journal
    env::commit(&isUserInProximity);
}
