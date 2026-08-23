window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');

  style.textContent = `
    .intel-hero {
      background: radial-gradient(circle at 88% 10%, #623305 0, transparent 33%),
        linear-gradient(125deg, #090a0e, #25180d);
      color: #fff;
      border-radius: 14px;
      padding: 30px;
      border: 1px solid rgba(255, 133, 0, .34);
    }

    .intel-hero h1 {
      margin: 0 0 6px;
      font-size: 28px;
    }

    .intel-hero p {
      margin: 0;
      color: #dfd4c7;
    }

    .intel-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin-top: 20px;
    }

    .intel-grid {
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 16px;
      margin-top: 16px;
    }

    .intel-card {
      background: #fffdf9;
      border: 1px solid #ddd6cb;
      border-radius: 12px;
      padding: 20px;
    }

    .intel-card h2 {
      font-size: 17px;
      margin: 0 0 12px;
    }

    .timeline {
      border-left: 2px solid #ffb15c;
      margin: 9px 0 0 7px;
      padding-left: 18px;
    }

    .timeline-item {
      position: relative;
      padding: 0 0 17px;
    }

    .timeline-item:before {
      content: '';
      position: absolute;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #ff8500;
      left: -24px;
      top: 5px;
    }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    .timeline-date {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .7px;
      color: #9a5100;
      font-weight: 800;
    }

    .timeline-item p {
      margin: 2px 0 0;
      color: #57524a;
      font-size: 13px;
    }

    .audit-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .audit-list li {
      display: flex;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #ece5db;
      font-size: 13px;
    }

    .audit-list li:last-child {
      border: 0;
    }

    .risk {
      width: 8px;
      height: 8px;
      background: #db6e00;
      border-radius: 50%;
      margin-top: 6px;
      flex: none;
    }

    .ok {
      background: #198560;
    }

    .hearing {
      grid-column: 1 / -1;
      background: #12100d;
      color: #fff;
      border-radius: 12px;
      padding: 22px;
    }

    .hearing h2 {
      margin: 0 0 12px;
      font-size: 18px;
    }

    .hearing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .hearing-grid div {
      border-left: 1px solid #6c4824;
      padding-left: 13px;
      color: #ded3c5;
      font-size: 13px;
    }

    .hearing-grid b {
      display: block;
      color: #ffb15c;
      margin-bottom: 4px;
    }

    .verify-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .verify-table td {
      padding: 10px 4px;
      border-bottom: 1px solid #e9e2d7;
    }

    .verify-table td:last-child {
      text-align: right;
    }

    .verify-queued {
      background: #fff0df;
      color: #8a4700;
    }

    .verify-ready {
      background: #e8f7f0;
      color: #126c51;
    }

    .ai-analysis {
      white-space: pre-wrap;
      color: #49453f;
      line-height: 1.6;
      font-size: 14px;
    }

    .matter-select {
      margin-top: 18px;
      width: 100%;
      border: 1px solid #d7cfc4;
      border-radius: 8px;
      padding: 11px;
      background: #fffdf9;
      font: inherit;
    }

    @media (max-width: 850px) {
      .intel-grid,
      .hearing-grid {
        grid-template-columns: 1fr;
      }

      .intel-hero {
        padding: 23px;
      }
    }
  `;

  document.head.appendChild(style);

  const nav = document.querySelector(
    '.sidebar .nav-btn[data-page="matters"]'
  );

  if (!nav) return;

  const button = document.createElement('button');
  button.className = 'nav-btn';
  button.textContent = '◉ Matter Intelligence';
  button.dataset.page = 'matter-intelligence';

  nav.insertAdjacentElement('afterend', button);

  const content = document.querySelector('.content');

  const page = document.createElement('section');
  page.id = 'matter-intelligence';
  page.className = 'page';

  page.innerHTML = `
    <div class="intel-hero">
      <h1>Matter Intelligence</h1>

      <p>
        Turn a file into a defensible, review-ready case picture.
        Track chronology, evidence gaps, hearing preparation and source verification.
      </p>

      <select class="matter-select" id="matterSelect">
        <option>ABC Pvt Ltd v. XYZ Ltd</option>
        <option>Mehta Employment Dispute</option>
        <option>Sunrise Properties</option>
      </select>

      <div class="intel-actions">
        <button class="btn btn-primary" id="matterAiBtn">
          Generate matter audit
        </button>

        <button class="btn btn-light" id="addTimelineBtn">
          + Add chronology event
        </button>
      </div>
    </div>

    <div class="intel-grid">
      <section class="intel-card">
        <h2>Chronology of events</h2>

        <div class="timeline" id="timeline">
          <div class="timeline-item">
            <div class="timeline-date">12 Aug 2026 · Agreement</div>
            <p>
              Commercial supply agreement executed between the parties.
              <strong>Source: ABC Agreement.pdf, p. 3</strong>
            </p>
          </div>

          <div class="timeline-item">
            <div class="timeline-date">04 Sep 2026 · Correspondence</div>
            <p>
              Client alleges non-delivery and invokes the notice clause.
              <strong>Source: Email chain, 04 Sep</strong>
            </p>
          </div>

          <div class="timeline-item">
            <div class="timeline-date">18 Sep 2026 · Pre-litigation</div>
            <p>
              Demand notice issued; response is pending review.
              <strong>Source: Legal Notice.docx</strong>
            </p>
          </div>
        </div>
      </section>

      <section class="intel-card">
        <h2>Matter audit</h2>

        <ul class="audit-list">
          <li>
            <span class="risk"></span>
            <span>
              <strong>Missing:</strong>
              Delivery records supporting the alleged completion of supply.
            </span>
          </li>

          <li>
            <span class="risk"></span>
            <span>
              <strong>Review:</strong>
              Dispute-resolution clause and notice-service requirements.
            </span>
          </li>

          <li>
            <span class="risk ok"></span>
            <span>
              <strong>Available:</strong>
              Executed agreement and first demand notice.
            </span>
          </li>
        </ul>
      </section>

      <section class="hearing">
        <h2>Next-hearing preparation</h2>

        <div class="hearing-grid">
          <div>
            <b>Objective</b>
            Seek time-bound directions for the response and preservation of relevant records.
          </div>

          <div>
            <b>Carry</b>
            Agreement, notice, correspondence chronology and proof of service.
          </div>

          <div>
            <b>Open question</b>
            Whether the contractual dispute-resolution process is a condition precedent.
          </div>
        </div>
      </section>

      <section class="intel-card">
        <h2>Verification queue</h2>

        <table class="verify-table">
          <tbody>
            <tr>
              <td>
                <strong>Contractual notice clause</strong><br>
                <small>ABC Agreement.pdf, p. 12</small>
              </td>
              <td>
                <span class="status verify-ready">Source linked</span>
              </td>
            </tr>

            <tr>
              <td>
                <strong>Limitation position</strong><br>
                <small>Requires jurisdiction and cause-of-action date</small>
              </td>
              <td>
                <span class="status verify-queued">Needs review</span>
              </td>
            </tr>

            <tr>
              <td>
                <strong>Authorities on interim relief</strong><br>
                <small>Research not yet verified</small>
              </td>
              <td>
                <span class="status verify-queued">Queue research</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="intel-card">
        <h2>AI matter audit</h2>

        <div id="matterAnalysis" class="ai-analysis">
Generate an audit for a structured lawyer-reviewable checklist.
Authorities are not treated as verified unless linked to an official source.
        </div>
      </section>
    </div>
  `;

  content.insertBefore(page, content.querySelector('#research'));

  function showMatter() {
    document.querySelectorAll('.page').forEach((item) => {
      item.classList.toggle('active', item === page);
    });

    document.querySelectorAll('.nav-btn').forEach((item) => {
      item.classList.toggle('active', item === button);
    });

    document.getElementById('pageTitle').textContent = 'Matter Intelligence';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  button.addEventListener('click', showMatter);

  document.getElementById('addTimelineBtn').addEventListener('click', () => {
    const date = window.prompt(
      'Date or event label (example: 22 Sep 2026 · Hearing)'
    );

    const detail = window.prompt(
      'What happened? Include a source reference if available.'
    );

    if (!date || !detail) return;

    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-date"></div>
      <p></p>
    `;

    item.querySelector('.timeline-date').textContent = date;
    item.querySelector('p').textContent = detail;

    document.getElementById('timeline').appendChild(item);
  });

  document.getElementById('matterAiBtn').addEventListener('click', async () => {
    const output = document.getElementById('matterAnalysis');
    const matter = document.getElementById('matterSelect').value;

    output.textContent = 'LitigationOS is preparing a matter audit…';

    const prompt = `
Prepare a concise lawyer-reviewable matter audit for ${matter}.

Known context:
- Commercial supply agreement
- Alleged non-delivery claim
- Demand notice issued
- Delivery records are missing
- Dispute-resolution clause must be reviewed

Use headings:
Key issues
Missing information
Evidence to preserve
Hearing preparation
Research plan
Verification note

Do not invent legal authorities, facts, dates, or citations.
    `;

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: prompt,
          mode: 'assistant'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'The AI service is unavailable.'
        );
      }

      output.textContent = data.text;
    } catch (error) {
      output.textContent = error.message;
    }
  });
});
