import { suite, test, slow, timeout } from "mocha-typescript";

@suite(timeout(3000), slow(1000))
class Hello {
    @test world() {

    }
}