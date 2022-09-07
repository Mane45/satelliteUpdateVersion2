import "./ListSatellite.css";
import { SatelliteData } from "../../configs/config";
import ZoomToSatellite from "../SceneWrapper/components/ZoomTest";

function zoom(evnt) {
  console.log("zoom");
  console.log(evnt.target.parentElement);
  console.log(evnt.target.parentElement.children[0].name);
  setInterval(() => {
    console.log(new Date())
  })

}
function track() {
  console.log("track");
}
function polygon() {
  console.log("polygon");
}

function ListSatellite(props) {
  function dropDownSatellite() {
    document.querySelector(".list").classList.toggle("showList");
    document.querySelector(".down-arrow").classList.toggle("rotate180");
  }
  const handleItemClick = (e) => {
    //console.log(e.target.checked)
    e.target.checked = true
    console.log(e.target.checked)
    console.log(props)
    props.setSelectedSatellite((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked
    }));
  };
  const handleItemClickAll = (e) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    function checkedAll() {
      let checkboxes = document.querySelectorAll('input[type="checkbox"]');
      for (let checkbox of checkboxes) {
        //console.log(checkbox.checked);
        //checkbox.setAttribute("checked", "")
        checkbox.checked = "true";
        //console.log(checkbox);
      }
    }
    function removeCheckedAll() {
      let checkboxes = document.querySelectorAll('input[type="checkbox"]');
      for (let i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = !checkboxes[i].checked;
      }
    }
    if (e.target.checked) {
      checkedAll()
    } else removeCheckedAll()

    for (let i = 1; i < checkboxes.length; i++) {
      props.setSelectedSatellite((prevState) => ({
        ...prevState,
        [checkboxes[i].name]: e.target.checked,
      }));
    }
    props.setSelectedSatellite((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleZoom = (name) => {
    console.log(name);
    console.log(props);
    props.view.goTo({
      position: {
        x: 40.02,
        y: 42.02,
        z: 700000
      }
    })
    // if (e.target.parentElement.children[0].checked) {
    //   if (e.target.parentElement.children[0].name) {
    //     console.log("yes")
    //   }
    // } else alert("Please select the satellite")
  };

  let RenderedOutput = () => {
    return (
      <>
        {
          SatelliteData.map((item) => {
                return (
                    <div className="select-item" key={item.id}>
                        <input type="checkbox" name={item.id} onChange={(e) => {handleItemClick(e)}} />
                        <label>
                            <p className="satName">{item.lines.name}</p>
                        </label>
                        <button
                            className="zoom"
                            onClick={(item) => {
                                handleZoom(item.lines.name);
                            }}
                        >
                            Zoom
                        </button>
                        <button className="track" onClick={track}>
                            Track
                        </button>
                        <button className="polygon" onClick={polygon}>
                            Extent view
                        </button>
                    </div>
                );
            })
            
            
        }
      </>
    );
  };
  return (
    <div className="multi-selector">
      <div className="select-field" onClick={dropDownSatellite}>
        <input
          type="text"
          placeholder="Select Satellite"
          className="input-selector"
        />
        <span className="down-arrow">&#9660;</span>
      </div>
      <div className="list">
        <div className="select-item">
          <input type="checkbox" name="" onChange={handleItemClickAll}></input>
          <label>
            <p className="satName">Select All</p>
          </label>
        </div>
        <RenderedOutput />
      </div>
    </div>
  );
}
export default ListSatellite;
