<?php

it('redirects to the dashboard or login page when visiting the homepage', function () {
    $response = $this->get('/');

    // Assert that the response is a redirect (status 302)
    $response->assertRedirect();

    // Optionally, assert the redirect location
    // $response->assertRedirect('/dashboard'); // or '/login'
});
