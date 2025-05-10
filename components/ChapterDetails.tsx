export default function ChapterDetails() {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        Chapter 1 - The Solid State
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-medium mb-4">Details</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Seq.</h4>
              <ul className="list-disc list-inside mt-1">
                <li>
                  Set ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudentium.
                </li>
                <li>Title</li>
                <li>Chapter 1 - The Solid State</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Subtitle</h4>
              <ul className="list-disc list-inside mt-1">
                <li>
                  Learn about the solid states with ease and get sample papers
                  and notes too!
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Resources</h3>
          {/* Resources content would go here */}
        </div>

        <div>
          <h3 className="font-medium mb-4">SEO</h3>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
