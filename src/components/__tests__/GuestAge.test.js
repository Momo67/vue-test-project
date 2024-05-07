import { it, expect, describe, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import GuessAge from "../GuessAge.vue";
import "whatwg-fetch";


let component = null;

beforeEach(() => {
  component = render(GuessAge, {
    props: {
      title: 'Guess User Age App'
    }
  });
});

afterEach(() => {
  component.unmount();
});

export const restHandlers = [
  http.get('https://api.agify.io/', () => {
    return HttpResponse.json({ "count": 16854, "name": "maurice", "age": 74 });
  }),
]
const server = setupServer(...restHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
//  Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

/*
describe('Checking props...', () => {
  
  it("testing GuessAge title prop", async () => {
    screen.getByText('Guess User Age App');
  });
});

describe('Checking functions...', () => {
  it("test type of functions", async () => {
    expect(typeof wrapper.vm.getAge).toBe("function");
  });
});
*/

describe("GuessAge", () => {

  it("h1 content must change when prop title change", async () => {

    expect(screen.getByText((content, element) => {
      return (element.tagName.toLowerCase() === 'h1');
    }).innerHTML).contains("Guess User Age App");

    /*
    const title = 'Momo';
    component.container.setAttribute('title', title);
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return (element.tagName.toLowerCase() === 'h1');
      }).innerHTML).contains(title);
    });
    */

  });

  it("h1 content must change when prop title change", async () => {

    const title = 'Momo';
    component.container.setAttribute('title', title);
    expect(screen.getByText((content, element) => {
      return (element.tagName.toLowerCase() === 'h1');
    }).innerHTML).contains(title);

  });

  it("must receive a guest", async () => {

    await fireEvent.click(screen.getByText('Guess Age'));
    //const getById = queryByAttribute.bind(null, "id");
    //const span = getById(screen.container, "firstname");
    //const div = user.container.querySelector('div[id="firstname"]');

    //assert
    await waitFor(() => {
      expect(component.container.querySelector('div[id="firstname"]').innerHTML).contains("maurice");
      expect(screen.getByText((content, element) => {
        if ((element.tagName.toLowerCase() === 'span') && content.startsWith('Age:'))
          return true;
        else
          return null;
      }).innerHTML).contains("74");
    });

  });

});

