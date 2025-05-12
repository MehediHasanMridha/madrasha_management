<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>

    <!-- Styles -->
    <style>
        html,
        body {
            background-color: #f3f4f6;
            color: #1f2937;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            height: 100vh;
            margin: 0;
            line-height: 1.5;
        }

        .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .error-card {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            padding: 2rem;
            text-align: center;
            max-width: 28rem;
            width: 100%;
        }

        .error-code {
            font-size: 6rem;
            font-weight: 700;
            line-height: 1;
            color: #3b82f6;
            margin: 0;
            letter-spacing: -0.05em;
        }

        .error-title {
            font-size: 1.875rem;
            font-weight: 600;
            color: #111827;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }

        .error-message {
            color: #6b7280;
            font-size: 1.125rem;
            margin-bottom: 1.5rem;
        }

        .back-button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.2s;
        }

        .back-button:hover {
            background-color: #2563eb;
        }

        @media (max-width: 640px) {
            .error-code {
                font-size: 4rem;
            }

            .error-title {
                font-size: 1.5rem;
            }

            .error-message {
                font-size: 1rem;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="error-card">
            <h1 class="error-code">@yield('code', '404')</h1>
            <h2 class="error-title">@yield('title', 'Page Not Found')</h2>
            <div class="error-message">
                @yield('message', 'Sorry, we couldn\'t find the page you\'re looking for.')
            </div>
            <a href="{{ url('/') }}" class="back-button">
                Back to Home
            </a>
        </div>
    </div>
</body>

</html>