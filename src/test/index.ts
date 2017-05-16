import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from 'chai'
import { clean } from '../lib/clean'

@suite(timeout(3000), slow(1000))
class Index {

    @test cleanStringEnglish() {
        const input = clean('I know that I can use some second expectation.', 'english');
        const result = 'I know I use second expectation.';
        expect(input).to.be.equal(result);
    }

    @test cleanStringEnglishUnknown() {
        const input = clean('I know that I can use some second expectation.');
        const result = 'I know I use second expectation.';
        expect(input).to.be.equal(result);
    }

    @test cleanArrayEnglish() {
        const input = clean('I know I use second expectation.'.split(' '), 'english');
        const result = ['I', 'know', 'I', 'use', 'second', 'expectation.'];
        expect(input).to.have.same.members(result);
    }

    @test cleanArrayEnglishUnknown() {
        const input = clean('I know I use second expectation.'.split(' '));
        const result = ['I', 'know', 'I', 'use', 'second', 'expectation.'];
        expect(input).to.have.same.members(result);
    }

    @test cleanStringGerman() {
        const input = clean('Die eine Sache von damals.', 'german');
        const result = 'Die Sache damals.'
        expect(input).to.be.equal(result);
    }

    @test cleanStringGermanUnknown() {
        const input = clean('Die eine Sache von damals.');
        const result = 'Die Sache damals.';
        expect(input).to.be.equal(result);
    }

    @test cleanArrayGerman() {
        const input = clean(['Die', 'eine', 'Sache', 'von', 'damals'], 'german');
        const result = ['Die', 'Sache', 'damals']
        expect(input).to.have.same.members(result);
    }

    @test cleanArrayGermanUnknown() {
        const input = clean(['Die', 'eine', 'Sache', 'von', 'damals']);
        const result = ['Die', 'Sache', 'damals']
        expect(input).to.have.same.members(result);
    }

}