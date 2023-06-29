# d3.js
using for d3.js 


# d3.js 코드해석2

원본 : https://observablehq.com/@cbuie/expose-of-graph-visualizations1

```html
const links = data.links.map(d => Object.create(d));
const nodes = data.nodes.map(d => Object.create(d));
const nodeRadius = 17;
```

data.links, data.nodes 배열의 각 요소를 d로 줘서 Object.create(d)를 호출하여 객체를 생성해 links, nodes라는 새로운 배열에 저장됨

```html
const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on("zoom", _ => g.attr("transform", d3.event.transform));
```

d3.js에서 제공하는 zoom 기능 적용할수 있는 객체를 사용하고 scaleExtent는 최소 스케일 1배, 최대 스케일이 8배인 범위 설정

on 메소드를 사용하여 이벤트 리스너를 등록함 이벤트 리스너 내용은 ‘g’요소의 ‘transform 속석에 d3.event.transform값을 할당함

```html
const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .distance(nodeDistance)
        .id(d => d.id)
    )
    .force("charge", d3.forceManyBody().strength(chargeStr))
    .force("collide", d3.forceCollide(d => getRadius(d.group)))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(width / 2).strength(xStr))
    .force("y", d3.forceY(height * 0.4).strength(yStr));
```

1. **`const simulation = d3.forceSimulation(nodes);`**
    - **`d3.forceSimulation()`** 함수를 호출하여 물리학적 시뮬레이션(simulation) 객체를 생성합니다.
    - **`nodes`** 배열은 물리학적 시뮬레이션에 참여할 노드(node)들의 배열입니다.
    - **`simulation`** 변수에 물리학적 시뮬레이션 객체를 할당합니다.
2. **`.force("link", ...)`**
    - **`.force()`** 메소드를 사용하여 물리학적 시뮬레이션에 힘(force)을 추가합니다.
    - **`"link"`**는 힘의 이름(name)입니다.
    - **`d3.forceLink(links)`**는 링크(link)를 표현하기 위한 힘입니다.
    - **`.distance(nodeDistance)`**는 링크간의 거리(distance)를 설정합니다.
    - **`.id(d => d.id)`**는 노드의 고유 식별자(id)를 설정합니다.
3. **`.force("charge", d3.forceManyBody().strength(chargeStr))`**
    - **`.force()`** 메소드를 사용하여 물리학적 시뮬레이션에 힘(force)을 추가합니다.
    - **`"charge"`**는 힘의 이름(name)입니다.
    - **`d3.forceManyBody()`**는 많은 물체(many body) 간의 상호작용을 나타내는 힘입니다.
    - **`.strength(chargeStr)`**은 노드 간의 전하(charge)를 설정합니다.
    - **`chargeStr`**은 노드 간의 전하 강도(strength)를 나타내는 변수입니다.
4. **`.force("collide", d3.forceCollide(d => getRadius(d.group)))`**
    - **`.force()`** 메소드를 사용하여 물리학적 시뮬레이션에 힘(force)을 추가합니다.
    - **`"collide"`**는 힘의 이름(name)입니다.
    - **`d3.forceCollide()`**는 노드간의 충돌(collision)을 나타내는 힘입니다.
    - **`d => getRadius(d.group)`**는 노드의 반지름(radius)을 설정합니다.
    - **`getRadius()`** 함수는 노드의 그룹(group)에 따라 반지름을 결정하는 함수입니다.
5. **`.force("center", d3.forceCenter(width / 2, height / 2))`**
    - **`.force()`** 메소드를 사용하여 물리학적 시뮬레이션에 힘(force)을 추가합니다.
    
    - **`"center"`**는 힘의 이름(name)입니다.
    - **`d3.forceCenter()`**는 중심(center)으로 끌어당기는 힘입니다.
    - **`width / 2`**와 **`height / 2`**는 SVG 요소의 중심점(center point)을 나타냅니다.
6. **`.force("x", d3.forceX(width / 2).strength(xStr))`**
    - **`.force()`** 메소드를 사용하여 물리학적 시뮬레이션에 힘(force)을 추가합니다.
    - **`"x"`**는 힘의 이름(name)입니다.
    - **`d3.forceX()`**는 x축 방향으로 끌어당기는 힘입니다.
    - **`width / 2`**는 SVG 요소의 중심점(center point)을 나타냅니다.
    - **`.strength(xStr)`**은 힘의 강도(strength)를 설정합니다.
    - **`xStr`**은 x축 방향으로의 힘의 강도(strength)를 나타내는 변수입니다.
7. **`.force("y", d3.forceY(height * 0.4).strength(yStr));`**
    - **`.force()`** 메소드를 사용하여 물리학적 시뮬레이션에 힘(force)을 추가합니다.
    - **`"y"`**는 힘의 이름(name)입니다.
    - **`d3.forceY()`**는 y축 방향으로 끌어당기는 힘입니다.
    - **`height * 0.4`**는 SVG 요소의 중심점에서 y축 방향으로 40% 떨어진 위치를 나타냅니다.
    - **`.strength(yStr)`**은 힘의 강도(strength)를 설정합니다.
    - **`yStr`**은 y축 방향으로의 힘의 강도(strength)를 나타내는 변수입니다.

위의 코드는 D3.js 라이브러리를 사용하여 힘-기반 레이아웃을 적용한 그래프 시각화 코드입니다. 각 힘은 노드와 링크 간의 관계를 나타내며, 힘의 강도와 방향을 조절함으로써 노드들이 서로 밀치고 끌어당기며, 최종적으로 원하는 형태의 그래프 레이아웃을 만들어내는 것입니다.

```html
const svg = d3.select(DOM.svg(width, height));
```

width, hieght를 지정하여 새로운 SVG요소를 선택함.

```html
svg.call(zoom);
```

zoom 이벤트를 svg 요소에 바인딩 하는 코드임 ( 마우스 휠, 확대축소버튼으로 svg요소를 확대 / 축소 함)

```html
const defs = svg.append('defs');
  defs
    .selectAll('clipPath')
    .data(groupData)
    .join('clipPath')
    .attr('id', d => d.name + '-clip')
    .append('circle')
    .attr('r', d => nodeRadius * d.mx);
```

svg 요소 내에 defs 요소를 생성해서 데이터를 바인딩해 clipPath를 추가 함

data는 groupData라는 배열로 데이터로 바인딩 함

join은 clipPath요소를 생성하거나 선택한 후 clipPath요소와 데이터를 결합함

clipPath요소에 id 속성을 추가하고 [d.name](http://d.name) 속성과 -clip문자열을 연결하여 각 요소마다 고유한 id 값 생성

append는 clipPath 요소 내에 ‘circle’요소를 생성함

‘r’속성을 추가하고, 데이터의 ‘mx’속성값과 ‘nodeRadius’값의 곱을 반지름으로 설정함

이 코드를 통해, **`groupData`** 배열에 있는 각 요소의 **`mx`** 속성 값에 따라 반지름이 다른 **`clipPath`** 요소가 생성됩니다. 이후 이 **`clipPath`** 요소는 노드의 모양을 잘라내는데 사용됩니다.

```jsx
// group that gets the transfrom
  const g = svg.append("g");
```

svg 요소 내에 ‘g’ 요소를 생성하는 메소드

```jsx
const linkG = g
    .append('g')
    .selectAll('g')
    .data(links)
    .join('g');
```

‘g’요소를 선택하고 데이터를 바인딩 함.

append는 ‘g’ 요소 내에 ‘g’요소를 생성하는 메소드 임

selectAll는 ‘g’ 요소 내에 모든 ‘g’ 요소를 선택하는 메소드

data는 links 배열을 데이터로 바인딩 함

join는 선택된 ‘g’요소에 대한 데이터를 기반으로 추가할 요소를 반환함

그리고 반환된걸 linkG에 추가

이 코드는 그래프에서 링크를 나타내는 선을 그리기 위해 사용

```jsx
const line = linkG
    .append('path')
    .attr('id', d => d.index)
    .attr('stroke-opacity', 0.6)
    .attr('stroke', '#333')
    .attr('stroke-width', '1.5');
```

linkG를 데이터 바인딩 함

path 메소드를 생성

attr를 사용해서 line의 요소의 속성을 설정

stroke-opacity (선의 투명도) stroke (선의 색상), stroke-width(선의 두께)

```jsx
const lineText = linkG
    .append('text')
    .append('textPath')
    .attr('href', d => `#${d.index}`)
    .attr('startOffset', '50%')
    .append('tspan')
    .attr('class', 'link-arrow')
    .attr(
      "style",
      "text-anchor: middle; font: 24px sans-serif; user-select: none"
    )
    .attr('fill', '#333')
    .text(d =>
      (d.source.id == "Yujing Zhang") | (d.source.id == "Safari Night 2019")
        ? ''
        : '→'
    )
    .attr('dy', 8.75);
```

linkG의 데이터 바인딩 후 text요소를 생성하고 text 요소 내에 textPath요소를 생성

testPath요소를 설정함 startOffset은 선의 중심에 텍스트 위치하도록 지정

textPath요소 내 tspan요소를 생성함  .attr('class', 'link-arrow') → 화살표 아이콘에 대한 스타일을 지정하기 위한 CSS클래스 지정

style 텍스트 스타일 정함 text-anchor(텍스트 정렬방식), fill(텍스트 색상)

text속성은 텍스트의 내용 지정(특정 노드와 연결되는 링크에는 화살표를 나타내는 문자열 ‘→’가 표시되고, 그렇지 않은 경우 빈 문자열

dy속성은 세로 위치를 조정함.

```jsx
const node = g
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("data-name", d => d.id)
    .attr("class", d => `img-group ${d.group}`)
    .attr("fill", "none")
    .call(drag(simulation));
```

g요소에 g요소를 추가 함 

selectAll g 요소를 모두 선택

.data 는 데이터로 nodes 배열을 전달 함

.join : 데이터 바인딩된 요소 누락된 요소 결함

.attr("data-name", d => d.id) ‘data-name’ 속성에 노드 id 값 할당

.attr("class", d => `img-group ${d.group}`) -> class속성에 img-group과 노드의 그룹 값을 할당

노드의 색상을 지정 근데 여기선 아이콘 이미지로 구성되서 none을 지정

drag(simulation) 함수를 호출해 노드를 드래그 할 때 시뮬레이션을 수행

```jsx
function trumpCheck(id) {
    return id == "Donald J. Trump" ? nodeRadius * 2 : nodeRadius;
  }
```

trumpCheck함수를 id 매게변수를 가지고 만듬

id 값이 “Donald J. Trump”라면 nodeRadius *2 를 반환하고 아니면 nodeRadius를 반환함

```jsx
const cir = node
    .append('circle')
    .attr('r', d => getRadius(d.group))
    .attr('stroke', '#333')
    .attr('stroke-width', 2)
    .attr('fill', '#999');
```

node 를 바인딩하고 circle이라는 요소를 추가 함

r은 노드의 group 속성으로 반지름 계산하는 함수 임

stroke 는 색상 stroke-width 는 선 굵기 fill은 원의 색상 지정

```jsx
const img = node
    .append('image')
    .attr(
      'xlink:href',
      "https://storage.needpix.com/rsynced_images/attribution-icon-2888829_1280.png"
    )
    .attr('clip-path', d => `url(#${d.group}-clip)`)
    .attr('width', d => getRadius(d.group) * 2)
    .attr('height', d => getRadius(d.group) * 2)
    .attr('x', d => getRadius(d.group) * -1)
    .attr('y', d => getRadius(d.group) * -1);
```

D3.js 를 사용하여 그래프를 시각화 하는 코드 임

node데이터를 바인딩하고 image 요소를 추가 함 

xlink:href속성을 이용해 이미지 주소를 가지고 옴(원안에 있는 이미지)

clip path를 이용으로 클리핑 경로 설정

width hieght를 이용해 크기 설정 x, y 는 이미지의 위치 조정

```jsx
tooltip
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");
```

D3.js로 만들어진 tooltip을 설정하는 부분

class설정 

style로 position은 위치, visibility는 가시성을 설정

```jsx
node.on('touchmove mousemove', d => {
    tooltip.style("visibility", "visible");
    tooltip.text(d.tooltip);
    tooltip
      .style("top", `${d3.event.pageY - 10}px`)
      .style("left", `${d3.event.pageX + 10}px`);
  });
```

노드에 핸들러 함수를 등록함 → touchmove 와 mousemove이벤트 등록

이벤트 발생하면 visibility → visible로 설정하고 툴팁의 위치를 마우스 이벤트의 위치에 맞게 조정

pageX, pageY프로퍼티를 사용한다는데 정확하게 모름 ..

```jsx
linkG.on('touchmove mousemove', function(d) {
    tooltip.style('visibility', 'visible');
    tooltip.text(`${d.source.id} ${d.relationship} ${d.target.id}`);
    tooltip
      .style('top', `${d3.event.pageY - 10}px`)
      .style('left', `${d3.event.pageX + 10}px`);

    d3.select(this)
      .select('path')
      .style('stroke', hlColor)
      .style('stroke-opacity', 1)
      .style('stroke-width', '3');

    d3.selectAll(
      `g[data-name="${d.source.id}"] > circle, g[data-name="${d.target.id}"] > circle`
    )
      .style('stroke', hlColor)
      .style('stroke-width', '6');
  });
```

마우스 또는 터치 이벤트가 발생하면 실행되는 함수 임

visibility → visible로 바뀜 그리고 링크 소스와 타켓노드 관계를 나타내는 텍스트를 툴팁에 표시

g[data-name="${d.source.id}"] > circle, g[data-name="${d.target.id}"] > circle 이부분 기준을 모르겠음..

```jsx
node.on('touchend mouseleave', () => tooltip.style('visibility', 'hidden'));
```

마우스나 터치 이벤트 종료될 때 tooltip의 요소 중 visibility 속성을 hidden으로 설정하여 툴팁을 숨김

```jsx
linkG.on('touchend mouseleave', function(d) {
    tooltip.style('visibility', 'hidden');

    d3
      .select(this)
      .select('path')
      .node().style = '';

    d3.selectAll(
      `g[data-name="${d.source.id}"] > circle, g[data-name="${d.target.id}"] > circle`
    )
      .style('stroke', '#333')
      .style('stroke-width', '2');
  });
```

마우스나 터치 이벤트 종료되면 실행됨 

먼저 툴팁을 숨김 →tooltip.style('visibility', 'hidden');
그리고 관련된 path 요소의 스타일을 초기값으로 되돌림

선택된 노드와 관련된 모든 circle 요소의 스타일을 초기값으로 되돌림

(선택된 링크와 관련된 노드와 링크가 표시되는 방식을 되돌리는 역할)

```jsx
let pres = node.filter(d => d.group == "president").datum();
let tVict = node.filter(d => d.id == 'Trump Victory').datum();
let tOrg = node.filter(d => d.id == 'The Trump Organization').datum();
```

노드를 필터링 하는 코드

node 선택집합에서 group속성이 ‘president’ 노드만 필터링 함

.datum()은 선택 집합의 첫 번째 요소의 데이터를 반환

pres는 president인 첫 번째 노드

tVict는 id 속성이 Trump Victory인 첫 번째 노드

tOrg는 id 속성이 THe Trump Organization인 첫 번째 노드의 데이터 저장

```jsx
simulation.on("tick", function() {
    pres.fy = height / 12;
    pres.fx = width / 2;

    tVict.fy = height / 6;
    tVict.fx = width / 2 + nodeRadius * 6;

    tOrg.fy = height / 6;
    tOrg.fx = width / 2 - nodeRadius * 6;

    line.attr(
      "d",
      d => `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
    );
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });
```

D3.js의 force simulation을 사용해서 시뮬레이션 결과를 화면에 출력하는 코드

simulation.on(”tick”, function(){}부분은 tick 이벤트가 발생 할 때 마다 실행되는 함수를 정의함

pres.fy, pres.fx, tVict.fy, tVict.fx, tOrg.fy, tOrg.fx를 통해 노드가 시뮬레이션에서 어떤위치에 고정될 지 결정

line.attr → 두 노드 사이의 선을 그리기 위한 속성

node.attr(’transform’,)는 각 노드의 위치를 이동

```jsx
invalidation.then(() => simulation.stop());

  return svg.node();
}
```

invalidation은 D3내부 함수로 브라우저 창 크기조정같은것을 감지하고 시뮬레이션을중단하고 다시 시작하는데 사용됨

sumulation.stop()은 시뮬레이션을 중지하는 메소드

svg변수에 대한 노드를 반환해서 해당 svg 요소가 HTML에 삽입해 시각화 가능

현재 spring boot로 구현된 코드 → https://github.com/JongchanJeon/d3.js

필요한 데이터 json 형태

- nodes
    
    0: Object {id: "Lu Kunning", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown."}
    
    1: Object {id: "Zhu Ruining", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown. "}
    
    2: Object {id: "Dr. Charles Lee", group: "guest", photo: "DrCharlesLee_RED", tooltip: "Recruits Chinese clients for Trump tourism. Claims…ident Xi Jinping's business diplomacy initiative."}
    
    3: Object {id: "Donald J. Trump", group: "president", photo: "Trump", tooltip: "The 45th president of the United States, elected in November 2016."}
    
    4: Object {id: "Tong Jingjing", group: "guest", photo: "jingjing", tooltip: "CEO of Silver Aristocrats, an arm of an online investment bank marketed to wealthy Chinese clients."}
    
    5: Object {id: "Lei Yu", group: "guest", photo: "LeiYu", tooltip: "Occupation: Unknown."}
    
    6: Object {id: "Liting Xiong", group: "guest", photo: "LitingXiong", tooltip: "Chinese businessman, according to Cliff Li. \"An im…aintings on the spot to support the charity sale."}
    
    7: Object {id: "Lu Biao", group: "guest", photo: "LuBiao", tooltip: "President of Guangdong Huizhou Fuji Real Estate De…a Friendship Ambassador award by Dr. Charles Lee."}
    
    8: Object {id: "Liang Lu", group: "guest", photo: "LuLiang", tooltip: "Chinese-born tech executive, founder of 5miles and…erMiles, jersey sponsor of the Dallas Mavericks. "}
    
    9: Object {id: "RNC Cipriani Breakfast", group: "event", photo: "Event", tooltip: "Dec. 2, 2017: Fundraiser for Trump's 2020 re-elect…p members of the GOP. Entry fee: $1,000 - $50,000"}
    
    10: Object {id: "Mar-a-Lago Safari Night 2018", group: "event", photo: "Event", tooltip: "Jan. 26, 2018: Fundraiser for a little-known child…on for Trump tourism. Entry fee: $1,000 - $10,000"}
    
    11: Object {id: "Mar-a-Lago Friends of Israel", group: "event", photo: "Event", tooltip: "Feb. 25, 2018: Last minute pro-Israel event held a…rida Gov. Ron DeSantis. Entry fee: $750 - $75,000"}
    
    12: Object {id: "Mar-a-Lago RNC Lunch", group: "event", photo: "Event", tooltip: "March 3, 2018: Fundraiser for President Trump's 20…op members of the GOP. Entry fee: $2,700- $50,000"}
    
    13: Object {id: "Mar-a-Lago New Year's Eve", group: "event", photo: "Event", tooltip: "Dec. 31, 2018: Invite-only New Year's Eve party he…onald Trump Jr. and Eric Trump. Entry Fee: $1,000"}
    
    14: Object {id: "Trump Victory", group: "organization", photo: "TrumpPenceVictory", tooltip: "Political action committee exclusively benefiting President Trump's 2020 re-election campaign."}
    
    15: Object {id: "The Trump Organization", group: "organization", photo: "TrumpOrganization", tooltip: "Group of businesses belonging to President Trump and currently managed by his two adult sons."}
    
    16: Object {id: "Xianqin Qu ", group: "guest", photo: "Qu_RED", tooltip: "President of the Florida Chapter of the Council fo…ith Cindy Yang of Women's Charity Foundation Inc."}
    
    17: Object {id: "Shanjie Li", group: "guest", photo: "ShanjieLi_RED", tooltip: "Miami real estate investor specializing in develop…ernment, according to business ownership records."}
    
    18: Object {id: "Zijing Xu", group: "guest", photo: "Xu", tooltip: "Chinese-born bitcoin miner who runs his business from Australia. Known online as \"the Martian.\""}
    
    19: Object {id: "Yuan Yue", group: "guest", photo: "GenderlessIcon", tooltip: "Chairman of China Shuanghe Education Group, accord… according to a spokesperson for KidsRKids China."}
    
    20: Object {id: "Zubin Gong", group: "guest", photo: "zubingong", tooltip: "Cindy Yang's husband, manager of Tokyo Day Spas an…ents, which advertises access to President Trump."}
    
    21: Object {id: "Sun Ye", group: "guest", photo: "SunYe", tooltip: "Chinese actress and model, according to The New York Times."}
    
    22: Object {id: "Huachu Tang", group: "guest", photo: "tang", tooltip: "Chairman of China Dragon Automotive Investment, according to Cindy Yang's WeChat."}
    
    23: Object {id: "Yuehong Yang", group: "guest", photo: "Yang", tooltip: "General manager of China Dragon Automotive Investm…ding to Cindy Yang's WeChat and business website."}
    
    24: Object {id: "Li Jing", group: "guest", photo: "jingli", tooltip: "New York socialite and associate of Cindy Yang; sh…ere was zero distance between her and the Trumps."}
    
    25: Object {id: "Jie Yang", group: "guest", photo: "GenderlessIcon", tooltip: "Chinese financier accused of securities fraud in China, currently living in New York. "}
    
    26: Object {id: "Lu Zihan", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown."}
    
    27: Object {id: "Feng Yahua", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown."}
    
    28: Object {id: "Wu Hao", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown."}
    
    29: Object {id: "Huang Yacun", group: "guest", photo: "Yacun", tooltip: "Occupation: Unknown."}
    
    30: Object {id: "Jiang Rui", group: "guest", photo: "Jiang_Rui", tooltip: "Co-chair of the Houston Independent Film Festival …ous painter, according to an Asian GOP blog post."}
    
    31: Object {id: "Ren Meihua", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown."}
    
    32: Object {id: "Yun Li", group: "guest", photo: "YunLi", tooltip: "Chairman of the Meyer Alliance Cloud Information"}
    
    33: Object {id: "Lou Li", group: "guest", photo: "Unknown", tooltip: "Occupation: Unknown."}
    
    34: Object {id: "Meng Jinhong", group: "guest", photo: "Shang_RED", tooltip: "Also known as Monica Shang. Head of the Chinese Pe…roup associated with the Chinese Communist Party."}
    
    35: Object {id: "Safari Night 2019", group: "event", photo: "Event", tooltip: "March 30, 2019: Canceled Mar-a-Lago fundraiser for…p family and \"do propaganda.\" Entry fee: unknown."}
    
    36: Object {id: "Yujing Zhang", group: "guest", photo: "GenderlessIcon", tooltip: "Chinese woman arrested attempting to enter Mar-a-L…onics, including a jump drive containing malware."}
    
- links

- 0: Object {source: "Lei Yu", target: "Mar-a-Lago Friends of Israel", relationship: "attended", costWhereApplicable: "$750 - $75,000"}

1: Object {source: "Sun Ye", target: "Mar-a-Lago New Year's Eve", relationship: "attended", costWhereApplicable: "$1,000"}

2: Object {source: "Huachu Tang", target: "Mar-a-Lago New Year's Eve", relationship: "attended", costWhereApplicable: "$1,000"}

3: Object {source: "Yuehong Yang", target: "Mar-a-Lago New Year's Eve", relationship: "attended", costWhereApplicable: "$1,000"}

4: Object {source: "Lu Kunning", target: "Mar-a-Lago RNC Lunch", relationship: "attended", costWhereApplicable: "$2,700- $50,000"}

5: Object {source: "Lu Biao", target: "Mar-a-Lago RNC Lunch", relationship: "attended", costWhereApplicable: "$2,700- $50,000"}

6: Object {source: "Zhu Ruining", target: "Mar-a-Lago RNC Lunch", relationship: "attended", costWhereApplicable: "$2,700- $50,000"}

7: Object {source: "Yuan Yue", target: "Mar-a-Lago RNC Lunch", relationship: "attended", costWhereApplicable: "$2,700- $50,000"}

8: Object {source: "Xianqin Qu ", target: "Mar-a-Lago Safari Night 2018", relationship: "attended", costWhereApplicable: "$1,000 - $10,000"}

9: Object {source: "Meng Jinhong", target: "Mar-a-Lago Safari Night 2018", relationship: "attended", costWhereApplicable: "$1,000 - $10,000"}

10: Object {source: "Liting Xiong", target: "Mar-a-Lago Safari Night 2018", relationship: "attended", costWhereApplicable: "$1,000 - $10,000", undefined: "cindy yang's wechat"}

11: Object {source: "Zijing Xu", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

12: Object {source: "Li Jing", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

13: Object {source: "Jie Yang", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

14: Object {source: "Liang Lu", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

15: Object {source: "Shanjie Li", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

16: Object {source: "Zubin Gong", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

17: Object {source: "Lu Zihan", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

18: Object {source: "Tong Jingjing", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

19: Object {source: "Feng Yahua", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

20: Object {source: "Wu Hao", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

21: Object {source: "Huang Yacun", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

22: Object {source: "Jiang Rui", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

23: Object {source: "Ren Meihua", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

24: Object {source: "Yun Li", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

25: Object {source: "Lou Li", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

26: Object {source: "Xianqin Qu ", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$1,000 - $2,700"}

27: Object {source: "Dr. Charles Lee", target: "Mar-a-Lago Friends of Israel", relationship: "attended", costWhereApplicable: "$750 - $75,000"}

28: Object {source: "Dr. Charles Lee", target: "Mar-a-Lago Safari Night 2018", relationship: "attended", costWhereApplicable: "$1,000 - $10,000"}

29: Object {source: "Dr. Charles Lee", target: "RNC Cipriani Breakfast", relationship: "attended", costWhereApplicable: "$2,700"}

30: Object {source: "Trump Victory", target: "Donald J. Trump", relationship: "finaincially benefits"}

31: Object {source: "The Trump Organization", target: "Donald J. Trump", relationship: "finaincially benefits"}

32: Object {source: "Mar-a-Lago Safari Night 2018", target: "The Trump Organization", relationship: "paid to", costWhereApplicable: "$40,000"}

33: Object {source: "Mar-a-Lago Friends of Israel", target: "The Trump Organization", relationship: "paid percentage to"}

34: Object {source: "Mar-a-Lago New Year's Eve", target: "The Trump Organization", relationship: "paid percentage to"}

35: Object {source: "Mar-a-Lago RNC Lunch", target: "The Trump Organization", relationship: "paid to", costWhereApplicable: "$210,000"}

36: Object {source: "RNC Cipriani Breakfast", target: "Trump Victory", relationship: "raised money for"}

37: Object {source: "Mar-a-Lago RNC Lunch", target: "Trump Victory", relationship: "raised money for"}

38: Object {source: "Liang Lu", target: "RNC Cipriani Breakfast", relationship: "took official Trump photo at", costWhereApplicable: "$50,000"}

39: Object {source: "Zijing Xu", target: "RNC Cipriani Breakfast", relationship: "took official Trump photo at", costWhereApplicable: "$50,000"}

40: Object {source: "Yujing Zhang", target: "Safari Night 2019", relationship: "tried to attend"}

41: Object {source: "Safari Night 2019", target: "The Trump Organization", relationship: "would have paid"}
