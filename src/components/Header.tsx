export default function Header() {
  return (
    <header class="bg-gray-50">
      <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-8 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
              Cloud Task ☁️
            </h1>

            <p class="mt-1.5 text-sm text-gray-500">
              Manage your tasks and due dates here! 📝
            </p>
          </div>

          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center">
            <a
              class="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
              href="/tasks/create"
            >
              Create Task
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
